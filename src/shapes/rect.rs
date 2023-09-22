use image::{ImageBuffer, Rgba, RgbaImage};
use std::marker::PhantomData;
use raqote::{Source, SolidSource, GradientStop, Point, Gradient, Spread, PathBuilder, DrawTarget, LineCap, LineJoin, DrawOptions, StrokeStyle};
use super::super::{DrawType, GradientType, Shape, Color};

pub fn draw_rect_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>, shape: &Shape) {
    let (x, y, width, height) = (shape.data[0], shape.data[1], shape.data[2], shape.data[3]);

    // Define the start and end points for the gradient
    let source: Source;
    match &shape.color {
        Color::RGBA { red, green, blue, alpha } => {
            source = Source::Solid(SolidSource{r: *red, g: *green, b: *blue, a: *alpha});
        }
        Color::Gradients { gradients } => {
            let mut stops:Vec<GradientStop> = Vec::new();
            for gradient in gradients.iter() {
                stops.push(GradientStop {position: gradient.position, color: raqote::Color::new(gradient.color[3], gradient.color[0], gradient.color[1], gradient.color[2])});
            }
            match gradients[0].gradient_type {
                GradientType::Linear => {
                    let start = Point { x, y, _unit: PhantomData };
                    let end = Point { x: width, y: height, _unit: PhantomData };
                    source = Source::new_linear_gradient(Gradient { stops }, start, end, Spread::Pad );
                }
                GradientType::Radial => {
                    let start = Point { x: x / 2., y: y / 2., _unit: PhantomData };
                    source = Source::new_radial_gradient(Gradient { stops }, start, width / 2., Spread::Pad );
                }
            }
        }
    }
    // Create a new path builder
    let mut path_builder = PathBuilder::new();
    path_builder.rect(x, y, width, height);
        // Create a new DrawTarget
    let mut draw_target = DrawTarget::new(width as i32, height as i32);
    match shape.draw_type {
        DrawType::Fill => {
            draw_target.fill(&path_builder.finish(), &source, &DrawOptions::new());
        }
        DrawType::Stroke => {
            let style = StrokeStyle {
                width: 1.,
                cap: LineCap::Butt,
                join: LineJoin::Miter,
                miter_limit: 10.,
                dash_array: Vec::new(),
                dash_offset: 0.,
            };
            draw_target.stroke(&path_builder.finish(), &source, &style, &DrawOptions::new());
        }
    }
    // Convert raqote DrawTarget to image::ImageBuffer
    let raw_image = draw_target.get_data_u8().to_vec();
    let buffer:RgbaImage = ImageBuffer::<Rgba<u8>, Vec<u8>>::from_raw(width as u32, height as u32, raw_image).unwrap();
    for (_x, _y, pixel,) in buffer.enumerate_pixels() {
        if pixel != &Rgba([0,0,0,0]) {
            img.put_pixel(_x + x as u32, _y + y as u32, pixel.to_owned());
        }
        // else {
        //     img.put_pixel(_x + x as u32, _y + y as u32, *img.get_pixel(_x, _y));
        // }
    }
}
