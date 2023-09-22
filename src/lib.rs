mod shapes;
// extern crate image;
// extern crate imageproc;
// extern crate rusttype;
// extern crate reqwest;
// extern crate num_integer;
// extern crate regex;

use image::{ImageBuffer, Rgba, GenericImageView, GenericImage, imageops::resize, open, RgbaImage};
// use imageproc::utils::{load_image_or_panic};
// use imageproc::drawing::{draw_filled_rect_mut, draw_hollow_rect_mut};
use deno_bindgen::deno_bindgen;

pub type Gradients = Vec<CreateGradient>;
pub type Color = SelectColor<Gradients>;
pub type DenoImageData = CreateImage<Shape>;

#[deno_bindgen]
pub enum ShapeType {
    Rect,
    Circle
}

#[deno_bindgen]
pub enum SelectColor<T> {
    RGBA {red: u8, green: u8, blue: u8, alpha: u8},
    Gradients{ gradients: T }
}

#[deno_bindgen]
pub enum DrawType {
    Fill,
    Stroke
}

#[deno_bindgen]
pub enum GradientType {
    Linear,
    Radial
}

#[deno_bindgen]
pub struct CreateGradient {
    gradient_type: GradientType,
    position: f32,
    color: Vec<u8>
}

#[deno_bindgen]
pub struct Shape {
    shape_type: ShapeType,
    draw_type: DrawType,
    data: Vec<f32>,
    text: Option<String>,
    color: Color
}

#[deno_bindgen]
pub struct CreateImage<T> {
    shapes: Vec<T>
}

#[deno_bindgen]
fn setShape(shape: Shape) -> Shape {
    shape
}

fn create_image(width:u32, height:u32, c_image: DenoImageData) -> RgbaImage {
    let mut img= ImageBuffer::new(width,height);
    for shape in c_image.shapes.iter() {
        match shape.shape_type {
            ShapeType::Rect => shapes::rect::draw_rect_mut(&mut img, shape),
            ShapeType::Circle => shapes::circle::draw_circle_mut(&mut img, shape)
        };
    }
    img
}
