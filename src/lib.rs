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
use std::thread;
use tokio::fs::File;
use tokio::io::AsyncWriteExt;
use image::EncodableLayout;

pub type Gradients = Vec<CreateGradient>;
pub type Color = SelectColor<Gradients>;
pub type GradientSelect = GradientSet<Point>;

#[deno_bindgen]
pub enum ShapeType {
    Rect,
    Circle,
    Triangle,
    Line,
    Text
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
pub enum GradientSet<T> {
    Linear{ start: T, end: T },
    Radial{ center: T, radius: f32 }
}

#[deno_bindgen]
pub struct Point{
    x: f32,
    y: f32
}

#[deno_bindgen]
pub struct CreateGradient {
    gradient_select: GradientSelect,
    position: f32,
    color: Vec<u8>
}

#[deno_bindgen]
pub struct Shape {
    shape_type: ShapeType,
    draw_type: DrawType,
    data: Vec<f32>,
    text: Option<String>,
    path: Option<String>,
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

fn create_image_by_thread(width:u32, height:u32, c_image: CreateImage<Shape>) -> RgbaImage {
    let mut img= ImageBuffer::new(width,height);
    let handler = thread::spawn(move || {
        for shape in c_image.shapes.iter() {
            match shape.shape_type {
                ShapeType::Rect => shapes::rect::draw_rect_mut(&mut img, shape, width, height),
                ShapeType::Circle => shapes::circle::draw_circle_mut(&mut img, shape, width, height),
                ShapeType::Triangle => shapes::triangle::draw_triangle_mut(&mut img, shape, width, height),
                ShapeType::Line => shapes::line::draw_line_mut(&mut img, shape, width, height),
                ShapeType::Text => shapes::text::draw_text_mut(&mut img, shape, width, height)
            };
        }
        img
    });
    handler.join().unwrap()
}

fn create_image_by_normal(width:u32, height:u32, c_image: CreateImage<Shape>) -> RgbaImage {
    let mut img= ImageBuffer::new(width,height);
    for shape in c_image.shapes.iter() {
        match shape.shape_type {
            ShapeType::Rect => shapes::rect::draw_rect_mut(&mut img, shape, width, height),
            ShapeType::Circle => shapes::circle::draw_circle_mut(&mut img, shape, width, height),
            ShapeType::Triangle => shapes::triangle::draw_triangle_mut(&mut img, shape, width, height),
            ShapeType::Line => shapes::line::draw_line_mut(&mut img, shape, width, height),
            ShapeType::Text => shapes::text::draw_text_mut(&mut img, shape, width, height)
        };
    }
    img
}


#[deno_bindgen(non_blocking)]
fn save_image(path: &str, width:u32, height:u32, data: CreateImage<Shape>) {
    create_image_by_thread(width, height, data).save(path).unwrap();
}

#[deno_bindgen(non_blocking)]
fn save_image_1(path: &str, width:u32, height:u32, data: CreateImage<Shape>) {
    let handler = thread::spawn(move || {
        create_image_by_normal(width, height, data)
    });
    handler.join().unwrap().save(path).unwrap();
}

#[deno_bindgen(non_blocking)]
fn save_image_2(path: &str, width:u32, height:u32, data: CreateImage<Shape>) {
    create_image_by_normal(width, height, data).save(path).unwrap();
}

#[deno_bindgen(non_blocking)]
fn test1() -> String {
    "123".to_string()
}