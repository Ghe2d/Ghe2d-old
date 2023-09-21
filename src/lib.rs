mod shapes;

use shapes::circle;
// extern crate image;
// extern crate imageproc;
// extern crate rusttype;
// extern crate reqwest;
// extern crate num_integer;
// extern crate regex;

use image::{ImageBuffer, Rgba, GenericImageView, GenericImage, imageops::resize, open, RgbaImage};
use imageproc::utils::{load_image_or_panic};

use deno_bindgen::deno_bindgen;

#[deno_bindgen]
struct Shape {
    name: &'static str,
    data: Vec<i32>,
    text: Option<String>
}

#[deno_bindgen]
struct CreateImage<T> {
    shapes: Vec<T>
}

#[deno_bindgen]
fn setShape(shape: Shape) -> Shape {
    shape
}

fn create_image(width:u32, height:u32, c_image: CreateImage<Shape>) -> RgbaImage {
    let mut img= ImageBuffer::new(width,height);
    for shape in c_image.shapes.iter() {
        if shape.name == "filled_circle" {
            circle::create_filled_circle_mut(&mut img, &shape.data);
        }
        else if shape.name == "hollow_circle" {
            circle::create_hollow_circle_mut(&mut img, &shape.data);
        }
        else if shape.name == "filled_linear_circle" {
            circle::create_filled_linear_circle_mut(&mut img, &shape.data);
        }
    }
    img
}