import { Shape } from "../ffi.ts";
import { LineOptions, LineReturn } from "../types.ts";
import { setLine, setRGB, setRGBA, setColor, setGradient } from "../utilty.ts";

export default function(data: Shape[], options?: LineOptions): LineReturn {
    if(!options) options ={};
    if(!options.x1) options.x1 = 10;
    if(!options.y1) options.y1 = 1;
    if(!options.x2) options.x2 = 20;
    if(!options.y2) options.y2 = 5;
    if(!options.color) options.color = {red: 0, green: 0, blue:0, alpha: 255};
    return { 
        x1:options.x1,
        y1:options.y1,
        x2:options.x2,
        y2:options.y2,
        color:options.color,
        draw(options?: LineOptions) { return draw(this, data, options) },
        setMove(x, y) {return setLine(this, x, y, 1)},
        setLine(x, y) {return setLine(this, x, y, 2)},
        setRGB(red, green, blue) { return setRGB(this, red, green, blue) as LineReturn },
        setRGBA(red, green, blue, alpha) { return setRGBA(this, red, green, blue, alpha) as LineReturn },
        setGradient(gradient) { return setGradient(this, gradient) as LineReturn },
        setColor(color) { return setColor(this, color) as LineReturn }
    }
}

function draw(line: LineReturn, data: Shape[], options?: LineOptions): LineReturn {
    if(!options) options ={};
    if(!options.x1) options.x1 = options.x1 == 0 ? 0 : options.x1 || line.x1;
    if(!options.y1) options.y1 = options.y1 == 0 ? 0 : options.y1 || line.y1;
    if(!options.x2) options.x2 = options.x2 == 0 ? 0 : options.x2 || line.x2;
    if(!options.y2) options.y2 = options.y2 == 0 ? 0 : options.y2 || line.y2;
    if(!options.color) options.color = options.color ? options.color : line.color;
    data.push({
        shape_type: "Line",
        data: [options.x1, options.y1, options.x2, options.y2],
        draw_type: "Stroke",
        text: null,
        color: options.color
    });
    return line
}