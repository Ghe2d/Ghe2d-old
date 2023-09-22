import { Shape } from "../ffi.ts";
import { CircleOptions, CircleReturn } from "../types.ts";
import { setX, setY, setXAndY, setRadius, setType, setRGB, setRGBA, setColor, setGradient } from "../utilty.ts";

export default function (data: Shape[], options?: CircleOptions): CircleReturn {
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.color) options.color = {red: 0, green: 0, blue:0, alpha: 255};
    if(!options.type) options.type = "fill";
    if(!options.radius && options.radius != 0) options.radius = 50;
    return { 
        x:options.x,
        y:options.y,
        radius:options.radius,
        color:options.color,
        type: options.type,
        draw(options?: CircleOptions) { return draw(this, data, options) },
        setX(x) { return setX(this, x) as CircleReturn },
        setY(y) { return setY(this, y) as CircleReturn },
        setXAndY(x, y) { return setXAndY(this, x, y) as CircleReturn },
        setRadius(radius) { return setRadius(this, radius) },
        setType(type) { return setType(this, type) as CircleReturn },
        setRGB(red, green, blue) { return setRGB(this, red, green, blue) as CircleReturn },
        setRGBA(red, green, blue, alpha) { return setRGBA(this, red, green, blue, alpha) as CircleReturn },
        setGradient(gradient) { return setGradient(this, gradient) as CircleReturn },
        setColor(color) { return setColor(this, color) as CircleReturn }
    }
}

function draw(circle: CircleReturn, data: Shape[], options?: CircleOptions): CircleReturn {
    if(!options) options ={};
    if(!options.x) options.x = options.x == 0 ? 0 : options.x || circle.x;
    if(!options.y) options.y = options.y == 0 ? 0 : options.y || circle.y;
    if(!options.color) options.color = options.color ? options.color : circle.color;
    if(!options.type) options.type =  options.type ? options.type : circle.type;
    if(!options.radius) options.radius = options.radius == 0 ? 0 : options.radius || circle.radius;
    data.push({
        shape_type: "Circle",
        data: [options.x, options.y, options.radius],
        draw_type: options.type == "fill" ? "Fill" : "Stroke",
        text: null,
        color: options.color
    });
    return circle
}
