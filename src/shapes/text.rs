use image::{ Rgba, RgbaImage, load_from_memory};
use std::{marker::PhantomData, fs::File};
use raqote::{Source, SolidSource, GradientStop, Point, Gradient, Spread, PathBuilder, DrawTarget, LineCap, LineJoin, DrawOptions, StrokeStyle};
use rusttype::{Font, Scale, point, PositionedGlyph};

use super::super::{ GradientSelect, Shape, Color, CreateGradient};

pub fn draw_text_mut(img: &mut RgbaImage, shape: &Shape) {
    // Create a new DrawTarget
    let (x, y, scale) = (
        shape.data[0], 
        shape.data[1], 
        shape.data[2]
    );
    let mut draw_target = DrawTarget::new(500, 500);

    // Load a font
    let font_data = std::io::BufReader::new(File::open(shape.path.as_ref().unwrap()).unwrap());
    // let font_data = include_bytes!("../../font/Ruwudu-Regular.ttf");
    let font = Font::try_from_bytes(font_data.buffer()).unwrap();
    let scale = Scale::uniform(scale);
    let start = point(x, font.v_metrics(scale).ascent + y);
    let glyphs: Vec<PositionedGlyph> = font.layout(shape.text.as_ref().unwrap(), scale, start).collect();
    match &shape.color {
        Color::RGBA { red, green, blue, alpha } =>{
            for glyph in glyphs {
                if let Some(bb) = glyph.pixel_bounding_box() {
                    glyph.draw(|x, y, v| {
                        let source = Source::Solid(SolidSource{r: *red, g: *green, b: *blue, a: (*alpha as f32 * v) as u8});
                        let mut path_builder = PathBuilder::new();
                        path_builder.rect(bb.min.x as f32 + x as f32, bb.min.y as f32 + y as f32, 1., 1.);
                        draw_target.fill(&path_builder.finish(), &source, &DrawOptions::new());
                    });
                }
            }
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
    let buffer = load_from_memory(&raw_image).unwrap().to_rgba8();
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
