use image::{ImageBuffer, Rgba, RgbaImage};
// use imageproc::drawing::{draw_filled_circle_mut, draw_hollow_circle_mut};
// use num_integer::Roots;

use std::marker::PhantomData;
use raqote::{Source, SolidSource, GradientStop, Point, Gradient, Spread, PathBuilder, DrawTarget, LineCap, LineJoin, DrawOptions, StrokeStyle};
use super::super::{DrawType, GradientSelect, Shape, Color};

pub fn draw_circle_mut(img: &mut RgbaImage, shape: &Shape, _width: u32, _height: u32) {
    let (x, y, mut radius) = (shape.data[0], shape.data[1], shape.data[2]);

    // Define the start and end points for the gradient
    let source: Source;
    match &shape.color {
        Color::RGBA { red, green, blue, alpha } => {
            source = Source::Solid(SolidSource{r: *blue, g: *green, b: *red, a: *alpha});
        }
        Color::Gradients { gradients } => {
            let mut stops:Vec<GradientStop> = Vec::new();
            for gradient in gradients.iter() {
                stops.push(GradientStop {position: gradient.position, color: raqote::Color::new(gradient.color[3], gradient.color[0], gradient.color[1], gradient.color[2])});
            }
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
        }
    }

    // let wx = radius;
    // let hy = radius;
    // let sx = x - radius;
    // let sy = y - radius;
    let mut sx = x;
    let mut sy = y;
    let mut width = radius as i32 * 2;
    let mut height = radius as i32 * 2;
    let ww = _width as i32 - width;
    let hh = _height as i32 - height;
    if width > _width as i32{
        width = _width as i32;
        radius = _width as f32 / 2.;
    }
    if height > _height as i32{
        height = _height as i32;
        radius = _height as f32 / 2.;
    }
    if sx > ww as f32{
        sx = ww as f32;
    }
    if sy > hh as f32 {
        sy = hh as f32;
    }
    // if x <= radius {
    //     wx = x;
    // }
    // if y <= radius {
    //     hy = y;
    // }
    let mut path_builder = PathBuilder::new();
    path_builder.arc(radius, radius, radius, 0., 3.14 * 2.);
    let mut draw_target = DrawTarget::new(width, height);
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
            img.put_pixel(_x + sx as u32, _y + sy as u32, pixel.to_owned());
        }
    }
}
