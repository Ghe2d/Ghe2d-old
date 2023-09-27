import { Shape } from "../ffi.ts";
import { TextOptions, TextReturn } from "../types.ts";
import { setFont, setSize, setText, setRGB, setRGBA, setColor, setGradient, setX, setY, setXAndY } from "../utilty.ts";

export default function(data: Shape[], options?: TextOptions): TextReturn {
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.size) options.size = 0;
    if(!options.text) options.text = "Ghe2d";
    if(!options.font) options.font = "./font/Ruwudu-Regular.ttf";
    if(!options.color) options.color = {RGBA: {red: 0, green: 0, blue:0, alpha: 255}};
    return { 
        x:options.x,
        y:options.y,
        color:options.color,
        font: options.font,
        text: options.text,
        size: options.size,
        draw(options?: TextOptions) { return draw(this, data, options) },
        setX(x) { return setX(this, x) as TextReturn },
        setY(y) { return setY(this, y) as TextReturn },
        setXAndY(x, y) { return setXAndY(this, x, y) as TextReturn },
        setSize(size) { return setSize(this, size) },
        setText(text) { return setText(this, text) },
        setFont(font) { return setFont(this, font) },
        setRGB(red, green, blue) { return setRGB(this, red, green, blue) as TextReturn },
        setRGBA(red, green, blue, alpha) { return setRGBA(this, red, green, blue, alpha) as TextReturn },
        setGradient(gradient) { return setGradient(this, gradient) as TextReturn },
        setColor(color) { return setColor(this, color) as TextReturn }
    }
}

function draw(triangle: TextReturn, data: Shape[], options?: TextOptions): TextReturn {
    if(!options) options ={};
    if(!options.x) options.x = options.x == 0 ? 0 : options.x || triangle.x;
    if(!options.y) options.y = options.y == 0 ? 0 : options.y || triangle.y;
    if(!options.size) options.size = options.size == 0 ? 0 : options.size || triangle.size;
    if(!options.color) options.color = options.color ? options.color : triangle.color;
    if(!options.font) options.font = options.font ? options.font : triangle.font;
    if(!options.text) options.text = options.text ? options.text : triangle.text;
    data.push({
        shape_type: "Text",
        data: [options.x, options.y, options.size],
        draw_type: "Fill",
        text: options.text,
        path: options.font,
        color: options.color
    });
    return triangle
}