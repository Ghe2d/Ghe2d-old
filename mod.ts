import { Shape } from "./lib/ffi.ts";
import { CircleOptions, CircleReturn, RectOptions, RectReturn, TriangleOptions, TriangleReturn, LineOptions, LineReturn } from "./lib/types.ts";
import createCircle from "./lib/shapes/circle.ts";
import createRect from "./lib/shapes/rect.ts";
import createTriangle from "./lib/shapes/triangle.ts";
import createLine from "./lib/shapes/line.ts";

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
    createTriangle(options?: TriangleOptions) : TriangleReturn{
        return createTriangle(this.shapes, options as TriangleOptions);
    }
    createLine(options?: LineOptions) : LineReturn{
        return createLine(this.shapes, options as LineOptions);
    }
}

export * from "./lib/shapes/circle.ts";
export * from "./lib/shapes/rect.ts";
export * from "./lib/shapes/triangle.ts";
export * from "./lib/shapes/line.ts";
export * from "./lib/types.ts";
export * from "./lib/ffi.ts";
