import { Shape, save_image, save_image_1, save_image_2, test1 } from "./lib/ffi.ts";
import { 
    CircleOptions,
    CircleReturn,
    RectOptions,
    RectReturn,
    TriangleOptions,
    TriangleReturn,
    LineOptions,
    LineReturn,
    TextOptions,
    TextReturn
} from "./lib/types.ts";
import createCircle from "./lib/shapes/circle.ts";
import createRect from "./lib/shapes/rect.ts";
import createTriangle from "./lib/shapes/triangle.ts";
import createLine from "./lib/shapes/line.ts";
import createText from "./lib/shapes/text.ts";

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
    createText(options?: TextOptions) : TextReturn{
        return createText(this.shapes, options as TextOptions);
    }
    save(path: string) {
        save_image(path, this.width, this.height, {shapes: this.shapes});
    }
    save1(path: string) {
        save_image_1(path, this.width, this.height, {shapes: this.shapes});
    }
    save2(path: string) {
        save_image_2(path, this.width, this.height, {shapes: this.shapes});
    }
}

export * from "./lib/shapes/circle.ts";
export * from "./lib/shapes/rect.ts";
export * from "./lib/shapes/triangle.ts";
export * from "./lib/shapes/line.ts";
export * from "./lib/shapes/text.ts";
export * from "./lib/types.ts";
export * from "./lib/ffi.ts";

const a = new Ghe2d(1000, 1000);


a.createRect().setXAndY(100 ,700).setColor({RGBA: {red: 220, green: 190, blue: 170, alpha: 210}}).setWidth(1100).setHeight(200).draw();
a.createCircle().setXAndY(100 ,100).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(200 ,100).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(300 ,100).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(400 ,100).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(100 ,200).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(100 ,300).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(100 ,400).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(200 ,200).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(300 ,300).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(400 ,400).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();
// a.createCircle().setXAndY(50 ,50).setColor({RGBA: {red: 255, green: 0, blue: 0, alpha: 255}}).setRadius(255).draw();

a.createTriangle()
.setAngle1(60, 20)
.setAngle2(20, 100)
.setAngle3(100, 100)
.setColor({RGBA: {red: 25, green: 250, blue: 0, alpha: 255}}).draw();

a.createLine()
.setMove(20 ,30)
.setLine(20, 300)
.setColor({RGBA: {red: 25, green: 70, blue: 253, alpha: 255}}).draw();

a.createText().setXAndY(100 ,100).setColor({RGBA: {red: 20, green: 190, blue: 37, alpha: 210}})
.setText("Hello to\nDjaja").setSize(120).setFont("./font/Ruwudu-Regular.ttf").draw();

// a.createText().setXAndY(200 ,100).setColor({RGBA: {red: 20, green: 190, blue: 37, alpha: 210}})
// .setText("Hello to\nDjaja").setSize(120).setFont("./font/Ruwudu-Regular.ttf").draw();

// a.createText().setXAndY(100 ,200).setColor({RGBA: {red: 20, green: 190, blue: 37, alpha: 210}})
// .setText("Hello to\nDjaja").setSize(120).setFont("./font/Ruwudu-Regular.ttf").draw();

a.createRect().setType("stroke")
.setXAndY(500 ,500).setColor({RGBA: {red: 220, green: 210, blue: 200, alpha: 240}}).setWidth(500).setHeight(500).draw();

a.createCircle().setType("stroke")
.setXAndY(300 ,300).setColor({RGBA: {red: 0, green: 255, blue: 0, alpha: 255}}).setRadius(220).draw();

a.createTriangle().setType("stroke")
.setAngle1(700, 20)
.setAngle2(600, 400)
.setAngle3(800, 400)
.setColor({RGBA: {red: 255, green: 250, blue: 0, alpha: 255}}).draw();

const n = 0;
const n1 = performance.now();
await a.save2(`./normal-${n}.png`);
const n2 = performance.now();
console.log("Normal:", Math.floor((n2 - n1) * 1000), "ms");

const s1 = performance.now();
await a.save(`./th1-${n}.png`);
const s2 = performance.now();
console.log("Thread-1 ",Math.floor((s2 - s1) * 1000), "ms");

const l1 = performance.now();
await a.save1(`./th2-${n}.png`);
const l2 = performance.now();
console.log("Thread-2:", Math.floor((l2 - l1) * 1000), "ms");
console.log("--------------------------------------");
// console.log(await test1())