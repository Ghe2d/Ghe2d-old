import * as path from "https://deno.land/std@0.197.0/path/mod.ts";
import { RectReturn, CircleReturn, TriangleReturn, ShapesData } from "./types.ts";
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

export function setAngle(shape: TriangleReturn, x: number, y: number, num: number): TriangleReturn {
    if(num == 1) {
        shape.x1 = x;
        shape.y1 = y;
    }
    else if(num == 2) {
        shape.x2 = x;
        shape.y2 = y;
    }
    else if(num == 3) {
        shape.x3 = x;
        shape.y3 = y;
    }
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

export function setType(shape: ShapesData | TriangleReturn, type: "fill" | "stroke"): ShapesData | TriangleReturn {
    shape.type = type;
    
    return shape;
}
export function setRGB(shape: ShapesData | TriangleReturn, red: number, green: number, blue: number) : ShapesData | TriangleReturn {
    shape.color = {red, green, blue, alpha: 255};
    return shape;
}

export function setRGBA(shape: ShapesData | TriangleReturn, red: number, green: number, blue: number, alpha: number) : ShapesData | TriangleReturn {
    shape.color = {red, green, blue, alpha};
    return shape;
}

export function setGradient(shape: ShapesData | TriangleReturn, gradient: Gradient) : ShapesData | TriangleReturn {
    shape.color = gradient.stops;
    return shape;
}

export function setColor(shape: ShapesData | TriangleReturn, color: Color) : ShapesData | TriangleReturn {
    shape.color = color;
    return shape;
}