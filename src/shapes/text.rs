use image::{ Rgba, RgbaImage, ImageBuffer};
use std::marker::PhantomData;
use raqote::{Source, SolidSource,
    GradientStop, 
    Point, Gradient,
    Spread, PathBuilder, DrawTarget, LineCap, LineJoin, DrawOptions, StrokeStyle
    };
use rusttype::{Font, Scale, point, PositionedGlyph};

use std::fs;
use std::io::{self, Read};
use std::path::Path;

use super::super::{ GradientSelect, Shape, Color, CreateGradient};

pub fn draw_text_mut(img: &mut RgbaImage, shape: &Shape, width: u32, height: u32) {
    // Create a new DrawTarget
    let (x, y, size) = (
        shape.data[0], 
        shape.data[1], 
        shape.data[2]
    );
    let mut draw_target = DrawTarget::new(width as i32, height as i32);

    // Load a font
    let font_data: &[u8] = &get_font_file_to_buffer(shape.path.as_ref().unwrap()).unwrap();
    // let font_data = include_bytes!("../../font/Ruwudu-Regular.ttf");
    let font = Font::try_from_bytes(font_data).unwrap();
    let scale = Scale::uniform(size);
    let offset = point(x, font.v_metrics(scale).ascent + y);
    let start = point(x, font.v_metrics(scale).ascent);
    let lines:Vec<&str> = shape.text.as_ref().unwrap().split("\n").collect();
    let glyphs: Vec<PositionedGlyph> = font.layout(shape.text.as_ref().unwrap(), scale, start).collect();
    let mut large = 0;
    let sy = y;
    match &shape.color {
        Color::RGBA { red, green, blue, alpha } =>{
            for (i, line) in lines.iter().enumerate() {
                let glyphs: Vec<PositionedGlyph> = font.layout(line, scale, offset).collect();
                for glyph in glyphs {
                    if let Some(bounding_box) = glyph.pixel_bounding_box() {
                        glyph.draw(|x, y, v| {
                            let av = (*alpha as f32 * v) as u8;
                            if av != 0 {
                                let source = Source::Solid(SolidSource{r: *blue, g: *green, b: *red, a: av});
                                // println!("{}+{}={}", y, bounding_box.min.y, bounding_box.min.y as u32 + y);
                                let x = x as i32 + bounding_box.min.x;
                                let y = y as i32 + bounding_box.min.y;
                                if i == 0 && large < y {
                                    large = y;
                                }
                                let mut path_builder = PathBuilder::new();
                                path_builder.rect(
                                    (x + i as i32 * 1) as f32, 
                                    (y + i as i32 * (large as i32 - sy as i32)) as f32, 
                                    1., 
                                    1.
                                );
                                draw_target.fill(&path_builder.finish(), &source, &DrawOptions::new());
                            }
                        });
                    }
                }
            }
            // for glyph in glyphs {
            //     if let Some(bb) = glyph.pixel_bounding_box() {
            //         glyph.draw(|x, y, v| {
            //             let av = (*alpha as f32 * v) as u8;
            //             if av != 0 {
            //                 let source = Source::Solid(SolidSource{r: *blue, g: *green, b: *red, a: av});
            //                 let mut path_builder = PathBuilder::new();
            //                 let mut sx = bb.min.x as f32 + x as f32;
            //                 let mut sy = bb.min.y as f32 + y as f32;
            //                 if sx >= width as f32 {
            //                     sy = sy * ((sx  / width as f32) as u32 + 4) as f32;
            //                     sx = sx - width as f32;
            //                 }
            //                 path_builder.rect(sx, sy, 1., 1.);
            //                 draw_target.fill(&path_builder.finish(), &source, &DrawOptions::new());
            //             }
            //         });
            //     }
            // }
        }
        Color::Gradients { gradients } => {
            let mut len = 0.;
            let mut num = 0.;
            for glyph in &glyphs {
                glyph.draw(|_x, _y, _v| {
                    len += 1.;
                });
            }

            for glyph in glyphs {
                if let Some(bb) = glyph.pixel_bounding_box() {
                    glyph.draw(|x, y, v| {
                        glyph_linear_draw(
                            bb.min.x as f32 + x as f32,
                            bb.min.y as f32 + y as f32,
                            v,
                            num / len as f32,
                            gradients,
                            &mut draw_target
                        );
                        num += 1.;
                    });
                }
            }
        }
    }

    let raw_image = draw_target.get_data_u8().to_vec();
    let buffer:RgbaImage = ImageBuffer::<Rgba<u8>, Vec<u8>>::from_raw(width, height, raw_image).unwrap();
    for (_x, _y, pixel,) in buffer.enumerate_pixels() {
        if pixel != &Rgba([0,0,0,0]) {
            img.put_pixel(_x, _y, pixel.to_owned());
        }
    }
}

pub fn glyph_linear_draw(x: f32, y: f32, v:f32, position: f32, gradients: &Vec<CreateGradient>, draw_target: &mut DrawTarget){
    let mut stops:Vec<GradientStop> = Vec::new();
    for gradient in gradients.iter() {
        stops.push(GradientStop {
            position: gradient.position * position, 
            color: raqote::Color::new(
                (gradient.color[3] as f32 * v) as u8, 
                gradient.color[0], 
                gradient.color[1], 
                gradient.color[2]
            )
        });
    }

    let source: Source;
    match &gradients[0].gradient_select {
        GradientSelect::Linear {start, end} => {
            let start = Point { x: start.x, y: start.y, _unit: PhantomData };
            let end = Point { x: end.x, y: end.y, _unit: PhantomData };
            source = Source::new_linear_gradient(Gradient { stops }, start, end, Spread::Pad );
        }
        GradientSelect::Radial{center, radius} => {
            let start = Point { x: center.x, y: center.y, _unit: PhantomData };
            source = Source::new_radial_gradient(Gradient { stops }, start, *radius, Spread::Pad );
        }
    }

    let mut path_builder = PathBuilder::new();
    path_builder.rect(x, y, 1., 1.);
    draw_target.fill(&path_builder.finish(), &source, &DrawOptions::new());
}

fn get_font_file_to_buffer<P: AsRef<Path>>(path: P) -> io::Result<Vec<u8>> {
    let mut file = fs::File::open(path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}