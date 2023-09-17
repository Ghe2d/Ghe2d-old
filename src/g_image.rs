use image::{ImageBuffer, Rgba, GenericImageView, GenericImage, imageops::resize, open};
use imageproc::{drawing::{draw_filled_rect_mut, draw_filled_circle_mut}, pixelops::interpolate};
use num_integer::Roots;
use std::collections::HashMap;
use deno_bindgen::deno_bindgen;

use image::DynamicImage;
use imageproc::rect::Rect;
use crate::imageproc::rect::Region;
// use imageproc::gradients;


#[deno_bindgen]
#[derive(Debug)]
struct CreateImage {
    data: HashMap<String, Vec<i32>>,
    text: Option<HashMap<String, Vec<String>>>
}

#[deno_bindgen]
fn save_image(w:u32, h:u32, data: CreateImage) -> CreateImage {
    let mut img: ImageBuffer<Rgba<u8>, Vec<u8>> = ImageBuffer::new(w, h);
    for (key, value) in data.data.iter() {
        if key == "rect" {
            // gradients::
            let rect = Rect::at(value[0], value[1]).of_size(value[2] as u32, value[3] as u32);
            // draw_filled_rect_mut(&mut img, rect, Rgba([value[4] as u8, value[5] as u8, value[6] as u8, value[7] as u8]));
            for (x, y, pixel) in img.enumerate_pixels_mut() {
                if rect.contains(x as i32, y as i32) {
                    let r = (2.0 * x as f32) as u8;
                    let b = (2.0 * y as f32) as u8;
                    *pixel = Rgba([r, 0, b, 255]);
                }
            }
        }
    }
    circle_linear(&mut img, 200, 200, 50);
    println!("{:?}", data);
    img.save("out.png").unwrap();
    data
}

fn circle_linear(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>, x: i32, y: i32, radius: i32) {
    let center = (x, y);
    let rr1:[u8; 4] = [220, 0, 0, 255]; 
    let rr2:[u8; 4] = [0, 0, 220, 255]; 
    
    for (x, y, pixel) in img.enumerate_pixels_mut() {
        let dx = center.0 - x as i32;
        let dy = center.1 - y as i32;

        let move_d: [i32; 2] = [10, 10]; // move x, y color
        let rd = -15.0; // radius color

        let d = ((x as i32 - (center.0 + move_d[0])).pow(2) + (y as i32 - (center.1 + move_d[1])).pow(2)).sqrt();
        let t = d as f32 / (radius as f32 + rd);
        if dx * dx + dy * dy <= radius * radius {
            let r = (rr1[0] as f32 * (1.0 - t) + rr2[0] as f32 * t) as u8;
            let g = (rr1[1] as f32 * (1.0 - t) + rr2[1] as f32 * t) as u8;
            let b = (rr1[2] as f32 * (1.0 - t) + rr2[2] as f32 * t) as u8;
            *pixel = Rgba([r, g, b, 255]);
        }
    }
}