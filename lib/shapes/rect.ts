import { Shape } from "../ffi.ts";
import { RectOptions, RectReturn } from "../types.ts";
import { setX, setY, setXAndY, setWidth, setHeight, setType, setRGB, setRGBA, setColor, setGradient } from "../utilty.ts";

export default function(data: Shape[], options?: RectOptions): RectReturn {
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.color) options.color = {RGBA: {red: 0, green: 0, blue:0, alpha: 255}};
    if(!options.type) options.type = "fill";
    if(!options.width && options.width != 0) options.width = 50;
    if(!options.height && options.height != 0) options.height = 50;
    return { 
        x:options.x,
        y:options.y,
        width:options.width,
        height:options.height,
        color:options.color,
        type: options.type,
        draw(options?: RectOptions) { return draw(this, data, options) },
        setX(x) { return setX(this, x) as RectReturn },
        setY(y) { return setY(this, y) as RectReturn },
        setXAndY(x, y) { return setXAndY(this, x, y) as RectReturn },
        setWidth(width) { return setWidth(this, width) },
        setHeight(height) { return setHeight(this, height) },
        setType(type) { return setType(this, type) as RectReturn },
        setRGB(red, green, blue) { return setRGB(this, red, green, blue) as RectReturn },
        setRGBA(red, green, blue, alpha) { return setRGBA(this, red, green, blue, alpha) as RectReturn },
        setGradient(gradient) { return setGradient(this, gradient) as RectReturn },
        setColor(color) { return setColor(this, color) as RectReturn }
    }
}

function draw(rect: RectReturn, data: Shape[], options?: RectOptions): RectReturn {
    if(!options) options ={};
    if(!options.x) options.x = options.x == 0 ? 0 : options.x || rect.x;
    if(!options.y) options.y = options.y == 0 ? 0 : options.y || rect.y;
    if(!options.color) options.color = options.color ? options.color : rect.color;
    if(!options.type) options.type =  options.type ? options.type : rect.type;
    if(!options.width) options.width = options.width == 0 ? 0 : options.width || rect.width;
    if(!options.height) options.height = options.height == 0 ? 0 : options.height || rect.height;
    data.push({
        shape_type: "Rect",
        data: [options.x, options.y, options.width, options.height],
        draw_type: options.type == "fill" ? "Fill" : "Stroke",
        text: null,
        path: null,
        color: options.color
    });
    return rect
}