import * as path from "https://deno.land/std@0.197.0/path/mod.ts";

export function __dirname() {
    return path.dirname(path.fromFileUrl(import.meta.url));
}

export function __filename() {
    return path.fromFileUrl(import.meta.url);
}

export type RGB = { red: number, green: number, blue: number };
export type RGBA = { red: number, green: number, blue: number, alpha: number };
export interface Shape {
    name: "filled_circle" | "hollow_circle" | "filled_linear_circle"
    data: number[],
    text?: string
}