import { CreateGradient, GradientType } from "./ffi.ts";

export type RGB = { red: number, green: number, blue: number };
export type RGBA = { red: number, green: number, blue: number, alpha: number };
export type Color = RGBA | CreateGradient[];
export type Gradient = {addStop(position: number, color: RGBA | RGB): Gradient, stops: CreateGradient[], type: GradientType};

export function createRGB(red: number, green: number, blue: number): RGB {
    return {red, green, blue}
}

export function createRGBA(red: number, green: number, blue: number, alpha: number): RGBA {
    return {red, green, blue, alpha}
}

export function createGradient(type: GradientType): Gradient {
    return {
        type, 
        stops: [], 
        addStop(position, color){ return addStop(this, position, color)}
    }
}

function addStop(gradient: Gradient, position: number, color: RGBA | RGB): Gradient {
    const _color = color as  RGBA;
    gradient.stops.push({position: position, gradient_type: gradient.type, color: [_color.red, _color.green, _color.blue, _color.alpha && _color.alpha == 0 ? _color.alpha : 255]});
    return gradient;
}