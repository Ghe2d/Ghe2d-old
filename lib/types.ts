import { Color, Gradient } from "./color.ts";

export interface Rect {
    x: number 
    y: number
    width: number
    height: number
    type: "fill" | "stroke"
    color: Color
}

export interface Circle {
    x: number 
    y: number
    radius: number
    type: "fill" | "stroke",
    color: Color
}

export interface RectOptions {
    x?: number 
    y?: number
    width?: number
    height?: number
    type?: "fill" | "stroke"
    color?: Color
}

export interface CircleOptions {
    x?: number 
    y?: number
    radius?: number
    type?: "fill" | "stroke",
    color?: Color
}

export interface RectReturn extends Rect {
    draw(options?: RectOptions): this
    setX(x: number): this
    setY(y: number): this
    setXAndY(x: number, y: number): this
    setWidth(width: number): this
    setHeight(height: number): this
    setType(type: "fill" | "stroke"): this
    setRGB(red: number, green: number, blue: number): this
    setRGBA(red: number, green: number, blue: number, alpha: number): this
    setGradient(gradient: Gradient): this
    setColor(color: Color): this
}

export interface CircleReturn extends Circle {
    draw(options?: CircleOptions): this
    setX(x: number): this
    setY(y: number): this
    setXAndY(x: number, y: number): this
    setRadius(radius: number): this
    setType(type: "fill" | "stroke"): this
    setRGB(red: number, green: number, blue: number): this
    setRGBA(red: number, green: number, blue: number, alpha: number): this
    setGradient(gradient: Gradient): this
    setColor(color: Color): this
}

export type ShapesData = RectReturn | CircleReturn;