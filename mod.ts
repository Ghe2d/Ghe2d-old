import { Shape } from "./lib/utilty.ts";
import { createCircle, CircleOptions, CircleReturn } from "./lib/shapes/circle.ts";

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
}

export * from "./lib/shapes/circle.ts";