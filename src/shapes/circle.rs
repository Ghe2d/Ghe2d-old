use image::{ImageBuffer, Rgba, RgbaImage};
// use imageproc::drawing::{draw_filled_circle_mut, draw_hollow_circle_mut};
// use num_integer::Roots;

use std::marker::PhantomData;
use raqote::{Source, SolidSource, GradientStop, Point, Gradient, Spread, PathBuilder, DrawTarget, LineCap, LineJoin, DrawOptions, StrokeStyle};
use super::super::{DrawType, GradientSelect, Shape, Color};

// pub fn create_filled_circle_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>,data: &Vec<i32>) {
//     draw_filled_circle_mut(
//         img,
//         (data[0], data[1]),
//         data[2],
//         Rgba([data[3] as u8, data[4] as u8, data[5] as u8, data[6] as u8])
//     )
// }

// pub fn create_hollow_circle_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>,data: &Vec<i32>) {
//     draw_hollow_circle_mut(
//         img,
//         (data[0], data[1]),
//         data[2],
//         Rgba([data[3] as u8, data[4] as u8, data[5] as u8, data[6] as u8])
//     )
// }

// pub fn create_filled_linear_circle_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>,data: &Vec<i32>) {
//     draw_filled_linear_circle_mut(
//         img,
//         (data[0], data[1]),
//         data[2],
//         [
//             Rgba([data[3] as u8, data[4] as u8, data[5] as u8, data[6] as u8]),
//             Rgba([data[7] as u8, data[8] as u8, data[9] as u8, data[10] as u8])
//         ],
//         Some((data[11], data[12])),
//         Some(data[13])
//     )
// }

// pub fn draw_filled_linear_circle_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>, center: (i32, i32), radius: i32, colors: [Rgba<u8>; 2], center_color: Option<(i32, i32)>, radius_color: Option<i32>) {
//     // let color_1:[u8; 4] = [220, 0, 0, 255]; 
//     // let color_2:[u8; 4] = [0, 0, 220, 255]; 
//     for (x, y, pixel) in img.enumerate_pixels_mut() {
//         let dx = center.0 - x as i32;
//         let dy = center.1 - y as i32;
//         let mut center_color_d: [i32; 2] = [0, 0];
//         let mut radius_color_d = 0.0;
//         if center_color.is_some() {
//             center_color_d = [center_color.unwrap().0, center_color.unwrap().1];
//         }

//         if radius_color.is_some() {
//             radius_color_d = radius_color.unwrap() as f32;
//         }

//         let d = ((x as i32 - (center.0 + center_color_d[0])).pow(2) + (y as i32 - (center.1 + center_color_d[1])).pow(2)).sqrt();
//         let t = d as f32 / (radius as f32 + radius_color_d);
//         if dx * dx + dy * dy <= radius * radius {
//             let r = (colors[0][0] as f32 * (1.0 - t) + colors[1][0] as f32 * t) as u8;
//             let g = (colors[0][1] as f32 * (1.0 - t) + colors[1][1] as f32 * t) as u8;
//             let b = (colors[0][2] as f32 * (1.0 - t) + colors[1][2] as f32 * t) as u8;
//             let a = (colors[0][3] as f32 * (1.0 - t) + colors[1][3] as f32 * t) as u8;
//             *pixel = Rgba([r, g, b, a]);
//         }
//     }
// }

pub fn draw_circle_mut(img: &mut RgbaImage, shape: &Shape) {
    let (x, y, radius) = (shape.data[0], shape.data[1], shape.data[2]);

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
    // Create a new path builder
    let mut path_builder = PathBuilder::new();
    path_builder.arc(x, y, radius, 0., 3.14);
        // Create a new DrawTarget
    let mut draw_target = DrawTarget::new(radius as i32 * 2, radius as i32 * 2);
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
    let buffer:RgbaImage = ImageBuffer::<Rgba<u8>, Vec<u8>>::from_raw(radius as u32 * 2, radius as u32 * 2, raw_image).unwrap();
    for (_x, _y, pixel,) in buffer.enumerate_pixels() {
        if pixel != &Rgba([0,0,0,0]) {
            img.put_pixel(_x + x as u32, _y + y as u32, pixel.to_owned());
        }
        // else {
        //     img.put_pixel(_x + x as u32, _y + y as u32, *img.get_pixel(_x, _y));
        // }
    }
}
