import { Shape } from "../ffi.ts";
import { TriangleOptions, TriangleReturn } from "../types.ts";
import { setAngle, setType, setRGB, setRGBA, setColor, setGradient } from "../utilty.ts";

export default function(data: Shape[], options?: TriangleOptions): TriangleReturn {
    if(!options) options ={};
    if(!options.x1) options.x1 = 10;
    if(!options.y1) options.y1 = 1;
    if(!options.x2) options.x2 = 20;
    if(!options.y2) options.y2 = 5;
    if(!options.x3) options.x3 = 30;
    if(!options.y3) options.y3 = 10;
    if(!options.color) options.color = {red: 0, green: 0, blue:0, alpha: 255};
    if(!options.type) options.type = "fill";
    return { 
        x1:options.x1,
        y1:options.y1,
        x2:options.x2,
        y2:options.y2,
        x3:options.x3,
        y3:options.y3,
        color:options.color,
        type: options.type,
        draw(options?: TriangleOptions) { return draw(this, data, options) },
        setAngle1(x, y) {return setAngle(this, x, y, 1)},
        setAngle2(x, y) {return setAngle(this, x, y, 2)},
        setAngle3(x, y) {return setAngle(this, x, y, 3)},
        setType(type) { return setType(this, type) as TriangleReturn },
        setRGB(red, green, blue) { return setRGB(this, red, green, blue) as TriangleReturn },
        setRGBA(red, green, blue, alpha) { return setRGBA(this, red, green, blue, alpha) as TriangleReturn },
        setGradient(gradient) { return setGradient(this, gradient) as TriangleReturn },
        setColor(color) { return setColor(this, color) as TriangleReturn }
    }
}

function draw(triangle: TriangleReturn, data: Shape[], options?: TriangleOptions): TriangleReturn {
    if(!options) options ={};
    if(!options.x1) options.x1 = options.x1 == 0 ? 0 : options.x1 || triangle.x1;
    if(!options.y1) options.y1 = options.y1 == 0 ? 0 : options.y1 || triangle.y1;
    if(!options.x2) options.x2 = options.x2 == 0 ? 0 : options.x2 || triangle.x2;
    if(!options.y2) options.y2 = options.y2 == 0 ? 0 : options.y2 || triangle.y2;
    if(!options.x3) options.x3 = options.x3 == 0 ? 0 : options.x3 || triangle.x3;
    if(!options.y3) options.y3 = options.y3 == 0 ? 0 : options.y3 || triangle.y3;
    if(!options.color) options.color = options.color ? options.color : triangle.color;
    if(!options.type) options.type =  options.type ? options.type : triangle.type;
    data.push({
        shape_type: "Triangle",
        data: [options.x1, options.y1, options.x2, options.y2, options.x3, options.y3],
        draw_type: options.type == "fill" ? "Fill" : "Stroke",
        text: null,
        path: null,
        color: options.color
    });
    return triangle
}