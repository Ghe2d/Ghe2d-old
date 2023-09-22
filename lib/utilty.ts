import * as path from "https://deno.land/std@0.197.0/path/mod.ts";
import { RectReturn, CircleReturn, ShapesData } from "./types.ts";
import { Gradient, Color } from "./color.ts";

export function __dirname() {
    return path.dirname(path.fromFileUrl(import.meta.url));
}

export function __filename() {
    return path.fromFileUrl(import.meta.url);
}

export function setX(shape: ShapesData, x: number): ShapesData {
    shape.x = x;
    return shape;
}

export function setY(shape: ShapesData, y: number): ShapesData {
    shape.y = y;
    return shape;
}

export function setXAndY(shape: ShapesData, x: number, y: number): ShapesData {
    shape.x = x;
    shape.y = y;
    return shape;
}

export function setRadius(shape: CircleReturn, radius: number): CircleReturn {
    shape.radius = radius;
    return shape;
}

export function setWidth(shape: RectReturn, width: number): RectReturn {
    shape.width = width;
    return shape;
}

export function setHeight(shape: RectReturn, height: number): RectReturn {
    shape.height = height;
    return shape;
}

export function setType(shape: ShapesData, type: "fill" | "stroke"): ShapesData {
    shape.type = type;
    
    return shape;
}
export function setRGB(shape: ShapesData, red: number, green: number, blue: number) : ShapesData {
    shape.color = {red, green, blue, alpha: 255};
    return shape;
}

export function setRGBA(shape: ShapesData, red: number, green: number, blue: number, alpha: number) : ShapesData {
    shape.color = {red, green, blue, alpha};
    return shape;
}

export function setGradient(shape: ShapesData, gradient: Gradient) : ShapesData {
    shape.color = gradient.stops;
    return shape;
}

export function setColor(shape: ShapesData, color: Color) : ShapesData {
    shape.color = color;
    return shape;
}