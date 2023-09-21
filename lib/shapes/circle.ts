import { RGB, RGBA, Shape } from "../utilty.ts";

export function createCircle(data: Shape[], options?: CircleOptions): CircleReturn {
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.color) options.color = {red: 0, green: 0, blue:0};
    if(!options.type) options.type = "fill";
    if(!options.radius && options.radius != 0) options.radius = 50;
    return { 
        x:options.x,
        y:options.y,
        radius:options.radius,
        color:options.color,
        type: options.type,
        draw(options?: CircleOptions) { return draw(this, data, options) },
        setX(x: number) { return setX(this, x) },
        setY(y: number) { return setY(this, y) },
        setXAndY(x: number, y: number) { return setXAndY(this, x, y) },
        setRadius(radius: number) { return setRadius(this, radius) },
        setType(type: "fill" | "stroke") { return setType(this, type) },
        setRGB(red: number, green: number, blue: number) { return setRGB(this, red, green, blue) },
        setRGBA(red: number, green: number, blue: number, alpha) { return setRGBA(this, red, green, blue, alpha) },
        setLinear(color1: RGB | RGBA, color2: RGB | RGBA) { return setLinear(this, color1, color2) }
    }
}

function draw(circle: CircleReturn, data: Shape[], options?: CircleOptions): CircleReturn {
    if(!options) options ={};
    if(!options.x) options.x = options.x == 0 ? 0 : options.x || circle.x;
    if(!options.y) options.y = options.y == 0 ? 0 : options.y || circle.y;
    if(!options.color) options.color = options.color ? options.color : circle.color;
    if(!options.type) options.type =  options.type ? options.type : circle.type;
    if(!options.radius) options.radius = options.radius == 0 ? 0 : options.radius || circle.radius;
    const colors = [];
    if(Array.isArray(options.color)) {
        const color1 = options.color[0] as RGBA;
        const color2 = options.color[1] as RGBA;
        colors.push(color1.red, color1.green, color1.blue, color1.alpha ? color1.alpha : 255);
        colors.push(color2.red, color2.green, color2.blue, color2.alpha ? color2.alpha : 255);
    }
    else {
        const color = options.color as RGBA;
        colors.push(color.red, color.green, color.blue, color.alpha ? color.alpha : 255);
    }
    data.push({
        name: Array.isArray(options.color) ? "filled_linear_circle" : options.type == "fill" ? "filled_circle" : "hollow_circle",
        data: [options.x, options.y, options.radius].concat(colors)
    });
    return circle
}

function setX(circle: CircleReturn, x: number): CircleReturn {
    circle.x = x;
    return circle;
}
function setY(circle: CircleReturn, y: number): CircleReturn {
    circle.y = y;
    return circle;
}
function setXAndY(circle: CircleReturn, x: number, y: number): CircleReturn {
    circle.x = x;
    circle.y = y;
    return circle;
}
function setRadius(circle: CircleReturn, radius: number): CircleReturn {
    circle.radius = radius;
    return circle;
}
function setType(circle: CircleReturn, type: "fill" | "stroke"): CircleReturn {
    circle.type = type;
    return circle;
}
function setRGB(circle: CircleReturn, red: number, green: number, blue: number) : CircleReturn {
    circle.color = {red, green, blue};
    return circle;
}
function setRGBA(circle: CircleReturn, red: number, green: number, blue: number, alpha: number) : CircleReturn {
    circle.color = {red, green, blue, alpha};
    return circle;
}
function setLinear(circle: CircleReturn, color1: RGB | RGBA, color2: RGB | RGBA) : CircleReturn {
    circle.color = [color1, color2];
    return circle;
}

export interface Circle {
    x: number 
    y: number
    radius: number
    type: "fill" | "stroke",
    color: (RGB | RGBA) | [RGB | RGBA, RGB | RGBA]
}

export interface CircleOptions {
    x?: number 
    y?: number
    radius?: number
    type?: "fill" | "stroke",
    color?: (RGBA | RGB) | [RGBA | RGB, RGBA | RGB]
}

export interface CircleReturn extends Circle{
    draw(options?: CircleOptions): this
    setX(x: number): this
    setY(y: number): this
    setXAndY(x: number, y: number): this
    setRadius(radius: number): this
    setType(type: "fill" | "stroke"): this
    setRGB(red: number, green: number, blue: number) : this
    setRGBA(red: number, green: number, blue: number, alpha: number) : this
    setLinear(color1: RGBA | RGB, color2: RGBA | RGB) : this
}