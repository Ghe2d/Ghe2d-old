import { Shape } from "./lib/ffi.ts";
import { CircleOptions, CircleReturn, RectOptions, RectReturn } from "./lib/types.ts";
import createCircle from "./lib/shapes/circle.ts";
import createRect from "./lib/shapes/rect.ts";

export class Ghe2d {
    private shapes: Shape[]
    public width: number
    public height: number
    constructor(width: number, height: number){
        this.shapes = [];
        this.width = width;
        this.height = height;
    }
    createCircle(options?: CircleOptions) : CircleReturn{
        return createCircle(this.shapes, options as CircleOptions);
    }
    createRect(options?: RectOptions) : RectReturn{
        return createRect(this.shapes, options as RectOptions);
    }
}

export * from "./lib/shapes/circle.ts";
