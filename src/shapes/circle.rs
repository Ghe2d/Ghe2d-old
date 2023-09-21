use image::{ImageBuffer, Rgba};
use imageproc::drawing::{draw_filled_circle_mut, draw_hollow_circle_mut};
use num_integer::Roots;

pub fn create_filled_circle_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>,data: Vec<i32>) {
    draw_filled_circle_mut(
        img,
        (data[0], data[1]),
        data[0],
        Rgba([data[3] as u8, data[4] as u8, data[5] as u8, data[6] as u8])
    )
}

pub fn create_hollow_circle_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>,data: Vec<i32>) {
    draw_hollow_circle_mut(
        img,
        (data[0], data[1]),
        data[0],
        Rgba([data[3] as u8, data[4] as u8, data[5] as u8, data[6] as u8])
    )
}

pub fn draw_filled_linear_circle_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>, center: (i32, i32), radius: i32, colors: [Rgba<u8>; 2], center_color: Option<(i32, i32)>, radius_color: Option<i32>) {
    // let color_1:[u8; 4] = [220, 0, 0, 255]; 
    // let color_2:[u8; 4] = [0, 0, 220, 255]; 
    for (x, y, pixel) in img.enumerate_pixels_mut() {
        let dx = center.0 - x as i32;
        let dy = center.1 - y as i32;
        let mut center_color_d: [i32; 2] = [0, 0];
        let mut radius_color_d = 0.0;
        if center_color.is_some() {
            center_color_d = [center_color.unwrap().0, center_color.unwrap().1];
        }

        if radius_color.is_some() {
            radius_color_d = radius_color.unwrap() as f32;
        }

        let d = ((x as i32 - (center.0 + center_color_d[0])).pow(2) + (y as i32 - (center.1 + center_color_d[1])).pow(2)).sqrt();
        let t = d as f32 / (radius as f32 + radius_color_d);
        if dx * dx + dy * dy <= radius * radius {
            let r = (colors[0][0] as f32 * (1.0 - t) + colors[1][0] as f32 * t) as u8;
            let g = (colors[0][1] as f32 * (1.0 - t) + colors[1][1] as f32 * t) as u8;
            let b = (colors[0][2] as f32 * (1.0 - t) + colors[1][2] as f32 * t) as u8;
            *pixel = Rgba([r, g, b, 255]);
        }
    }
}

pub fn create_filled_linear_circle_mut(img: &mut ImageBuffer<Rgba<u8>, Vec<u8>>,data: Vec<i32>) {
    draw_filled_linear_circle_mut(
        img,
        (data[0], data[1]),
        data[2],
        [
            Rgba([data[3] as u8, data[4] as u8, data[5] as u8, data[6] as u8]),
            Rgba([data[7] as u8, data[8] as u8, data[9] as u8, data[10] as u8])
        ],
        Some((data[11], data[12])),
        Some(data[13])
    )
}