extern crate image;
extern crate imageproc;
extern crate rusttype;
extern crate reqwest;
extern crate num_integer;
extern crate regex;

use image::{ImageBuffer, Rgba, GenericImageView, GenericImage, imageops::resize, open};
use imageproc::utils::{load_image_or_panic};

use num_integer::Roots;
use deno_bindgen::deno_bindgen;

// use std::os::raw::{c_void, c_uint};
use serde::de::value::UnitDeserializer;

mod shapes;

#[deno_bindgen]
fn print(){
    println!("gg1");
}

// #[deno_bindgen]
// type ImageBuffer = ImageBuffer;

#[deno_bindgen(non_blocking)]
fn create_image() -> *mut u8 {
    let img: ImageBuffer<Rgba<u8>, _> = ImageBuffer::new(100,100);
    img.into_raw().as_mut_ptr()
}

#[deno_bindgen]
struct AAA {
    x: i32,
    y: i32,
}

#[deno_bindgen]
pub fn print_width(data: &str) -> u8 {
    // println!("{:?}", img)
    // img.into_raw().as_mut_ptr()
    {
        let a: AAA = AAA{x: 120, y: 100};
    }
    let mut x:u8 = 0;
    if data == "gg" {
        x ^= 16;
        x ^= 6;
        // x ^= 64;
    }
    x
}

// #[deno_bindgen]
// fn l_image(img: *mut u8)  {
//     println!("{}",img.height());
// }