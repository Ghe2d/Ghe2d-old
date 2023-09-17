mod shapes;
mod g_image;

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

use std::collections::HashMap;

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
// #[derive(Debug)]
struct AAA {
    x: i32,
    y: i32,
}

#[deno_bindgen]
struct BBB {
    d: Vec<u8>
}

#[deno_bindgen]
fn get_ss(a: AAA){
    println!("{} * {} = {}", a.x, a.y, a.x * a.y);
}

#[deno_bindgen]
pub fn print_width(data: &str) -> AAA {
    // println!("{:?}", img)
    // img.into_raw().as_mut_ptr()
    let mut x:u8 = 0;
    if data == "gg" {
        x ^= 16;
        x ^= 6;
        // x ^= 64;
    }
    AAA{x: 120, y: 100}
}

#[deno_bindgen]
struct GsMap{
    m: HashMap<String, i32>
}

#[deno_bindgen]
struct GsArrMap{
    m: HashMap<String, Vec<i32>>
}

#[deno_bindgen]
fn test_map() -> GsMap{
    let mut map = HashMap::new();
    map.insert("name".to_string(), 120);
    map.insert("ok".to_string(), 130);
    GsMap { m: map }
}

#[deno_bindgen]
fn test_add_map(add: GsMap) -> GsMap{
    for (key, value) in add.m.iter() {
        println!("{} -> {}", key, value);
    }
    add
}

#[deno_bindgen]
fn test_add_arr_map(add: GsArrMap) -> GsArrMap{
    for (key, value) in add.m.iter() {
        println!("{} -> {:?}", key, value);
    }
    add
}

#[deno_bindgen]
fn test_buffer_return(buf: &[u8]) -> u8 {
    println!("Len: {}",buf.len());
    println!("Is has 2: {}", buf[0]&2 != 0);
    println!("buffer: {:?}", buf);
  100
}

#[deno_bindgen]
fn test_ri(buf: &[u8], z: i32) -> i32 {
    println!("buffer: {:?}", buf);
    println!("Z is: {z}");
    z * buf[0] as i32
}


// #[deno_bindgen]
// fn l_image(img: *mut u8)  {
//     println!("{}",img.height());
// }