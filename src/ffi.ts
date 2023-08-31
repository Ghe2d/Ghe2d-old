/// <reference lib="deno.unstable" />

let libSuffix = "";

switch(Deno.build.os) {
    case "windows":
        libSuffix = "dll";
        break;
    case "darwin":
        libSuffix = "dylib";
        break;
    default:
        libSuffix = "so";
        break;
}

const libName = `./build/libmain.${libSuffix}`;

const dylib = Deno.dlopen(libName, {
    // * Blend image
    createBLImage: {
        parameters: ["i32", "i32"],
        result: "pointer"
    },
    closeImage:{
        parameters: ["pointer"],
        result: "void"
    },
    resetImage:{
        parameters: ["pointer"],
        result: "void"
    },
    close:{
        parameters: ["pointer", "pointer"],
        result: "void"
    },
    reset:{
        parameters: ["pointer", "pointer"],
        result: "void"
    },
    // ?-----------------------------
    saveImage: {
        parameters: ["pointer", "pointer", "buffer", "isize"],
        result: "void"
    },
    loadImage: {
        parameters: [ "buffer", "isize"],
        result: "pointer"
    },
    imageIsValid:{
        parameters: ["pointer"],
        result: "bool"
    },
    toData: {
        parameters: ["pointer", "pointer", "buffer"],
        result: "buffer",
        nonblocking: true
    },
    // ?-----------------------------
    // * ctx
    createBLContext: {
        parameters: ["pointer"],
        result: "pointer"
    },
    endCtx:{
        parameters: ["pointer"],
        result: "void"
    },
    resetCtx:{
        parameters: ["pointer"],
        result: "void"
    },
    closeCtx:{
        parameters: ["pointer"],
        result: "void"
    },
    contextIsValid:{
        parameters: ["pointer"],
        result: "bool"
    },
    // ?-----------------------------
    save:{
        parameters: ["pointer"],
        result: "void"
    },
    restore:{
        parameters: ["pointer"],
        result: "void"
    },
    restoreClipping:{
        parameters: ["pointer"],
        result: "void"
    },
    resetMatrix:{
        parameters: ["pointer"],
        result: "void"
    },
    // ?-----------------------------
    fillAll:{
        parameters: ["pointer"],
        result: "void"
    },
    clearRect:{
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    clipToRect: {
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    // ?-----------------------------
    fillRect:{
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    strokeRect: {
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    fillRoundRect: {
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    strokeRoundRect: {
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    // ?-----------------------------
    fillCircle: {
        parameters: ["pointer", "f32", "f32", "f32"],
        result: "void"
    },
    strokeCircle: {
        parameters: ["pointer", "f32", "f32", "f32"],
        result: "void"
    },
    //?-----------------------
    fillBox:{
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    strokeBox: {
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    //?-----------------------
    fillChord:{
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    strokeChord: {
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    //?-----------------------
    fillEllipse: {
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    strokeEllipse: {
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    //?-----------------------
    fillPie: {
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    strokePie: {
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    //?-----------------------
    fillTriangle:{
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    strokeTriangle: {
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    //?-----------------------
    strokeLine:{
        parameters: ["pointer", "f32", "f32", "f32", "f32"],
        result: "void"
    },
    //?-----------------------
    // * styling
    color:{
        parameters: ["i32", "i32", "i32", "i32"],
        result: "pointer"
    },
    createLinearGradient:{
        parameters: ["f32", "f32", "f32", "f32"],
        result: "pointer"
    },
    createRadiaGradient:{
        parameters: ["f32", "f32", "f32", "f32", "f32"],
        result: "pointer"
    },
    addGradientStop:{
        parameters: ["pointer", "f32", "pointer"],
        result: "void"
    },
    gradientReset:{
        parameters: ["pointer"],
        result: "void"
    },
    gradientDelete:{
        parameters: ["pointer"],
        result: "void"
    },
    gradientIsValid:{
        parameters: ["pointer"],
        result: "bool"
    },
    createPattern:{
        parameters: ["pointer"],
        result: "pointer"
    },
    patternReset:{
        parameters: ["pointer"],
        result: "void"
    },
    patternDelete:{
        parameters: ["pointer"],
        result: "void"
    },
    patternIsValid:{
        parameters: ["pointer"],
        result: "bool"
    },
    //?-----------------------
    setFillStyleRgba:{
        parameters: ["pointer", "pointer"],
        result: "void"
    },
    setFillStyleGradient:{
        parameters: ["pointer", "pointer"],
        result: "void"
    },
    setFillStylePattern:{
        parameters: ["pointer", "pointer"],
        result: "void"
    },
    setFillAlpha:{
        parameters: ["pointer", "f32"],
        result: "void"
    },
    setStrokeStyleRgba:{
        parameters: ["pointer", "pointer"],
        result: "void"
    },
    setStrokeStyleGradient:{
        parameters: ["pointer", "pointer"],
        result: "void"
    },
    setStrokeStylePattern:{
        parameters: ["pointer", "pointer"],
        result: "void"
    },
    setStrokeAlpha:{
        parameters: ["pointer", "f32"],
        result: "void"
    },
    setGlobalAlpha:{
        parameters: ["pointer", "f32"],
        result: "void"
    },
    //?-----------------------
    setStrokeWidth:{
        parameters: ["pointer", "f32"],
        result: "void"
    },
    setStrokeMiterLimit:{
        parameters: ["pointer", "f32"],
        result: "void"
    },
    setStrokeDashOffset:{
        parameters: ["pointer", "f32"],
        result: "void"
    },
    //?-----------------------
    // * text
    createFillText: {
        parameters: ["pointer", "f32", "f32", "buffer", "i32", "pointer"],
        result: "void"
    },
    createStrokeText: {
        parameters: ["pointer", "f32", "f32", "buffer", "i32", "pointer"],
        result: "void"
    },
    fillGlyphRun: {
        parameters: ["pointer", "pointer", "buffer", "buffer", "f32", "f32"],
        result: "void"
    },
    strokeGlyphRun: {
        parameters: ["pointer", "pointer", "buffer", "buffer", "f32", "f32"],
        result: "void"
    },
    createFont:{
        parameters: ["buffer", "i32", "f32"],
        result: "pointer"
    },
    destroyFont:{
        parameters: ["pointer"],
        result: "void"
    },
    fontIsValid:{
        parameters: ["pointer"],
        result: "bool"
    },
    fontTest:{
        parameters: ["pointer", "buffer" , "i32", "buffer", "i32"],
        result: "void"
    }
    //?-----------------------
});


const ghe2d = dylib.symbols;




// new Deno.UnsafeCallback({parameters: ["i32", "i32"], result: "void"}, (a,b)=> {});

// const buf = new TextEncoder().encode("Hello.png");
// dylib.symbols.saveImage(createBL, buf, buf.length);
console.log("Start -------------------");

const bl = dylib.symbols.createBLImage(256, 256) as Deno.PointerObject;
const c = dylib.symbols.createBLContext(bl) as Deno.PointerObject;
const createBL =  new Deno.UnsafePointerView(bl).pointer;
const ctx = new Deno.UnsafePointerView(c).pointer;

dylib.symbols.clearRect(ctx, 0, 0, 256, 256);
dylib.symbols.setFillStyleRgba(ctx, color(255,255,255,255));
dylib.symbols.fillRect(ctx, 6, 6, 50, 50);
dylib.symbols.setFillStyleRgba(ctx, color(0,0,0,200));
dylib.symbols.fillRect(ctx, 250 - 50, 250 - 50, 50, 50);

const linear = dylib.symbols.createLinearGradient(0,0,150,100);
dylib.symbols.addGradientStop(linear, 0, color(255,255,255,255));
dylib.symbols.addGradientStop(linear, 1, color(0,0,0,255));
dylib.symbols.setFillStyleGradient(ctx, linear);
dylib.symbols.gradientDelete(linear);
dylib.symbols.fillCircle(ctx, 100, 100, 20);

const a = await BLtoBuffer(createBL, ctx);
if(a) Deno.writeFile("test/test8.png", a);

dylib.symbols.setStrokeWidth(ctx, 20);
const radia = dylib.symbols.createRadiaGradient(0,0,200,90,210);
dylib.symbols.addGradientStop(radia, 0, color(25,0,55,255));
dylib.symbols.addGradientStop(radia, 0.5, color(0,255,255,170));
dylib.symbols.addGradientStop(radia, 1, color(150,20,100,190));
dylib.symbols.setStrokeStyleGradient(ctx, radia);
dylib.symbols.gradientDelete(radia);
dylib.symbols.strokeCircle(ctx, 100, 200, 20);

const b = await BLtoBuffer(createBL, ctx);
if(b) Deno.writeFile("test/test9.png", b);

dylib.symbols.clearRect(ctx, 0, 0, 256, 256);


// dylib.symbols.setFillStyleRgba(ctx, color(255,255,255,255));
// dylib.symbols.fillAll(ctx);
dylib.symbols.setFillStyleRgba(ctx, color(0,0,0,255));
dylib.symbols.setStrokeStyleRgba(ctx, color(0,0,0,255));
dylib.symbols.setStrokeWidth(ctx, 1);

// dylib.symbols.strokeLine(ctx, 5, 17, 190, 207);

// const d = await BLtoBuffer(createBL, ctx);
// if(d) Deno.writeFile("test/test11.png", d);

const fo = new TextEncoder().encode("./font/Cairo-Regular.ttf");
const fo2 = new TextEncoder().encode("./font/Tajawal-Regular.ttf");
const font = dylib.symbols.createFont(fo, fo.length, 22);
const font2 = dylib.symbols.createFont(fo2, fo2.length, 22);
const buf = new TextEncoder().encode("ضبط الكلام كله ab ssa hello");
// dylib.symbols.createFillText(ctx, 1, 50, buf, buf.length, font);
// dylib.symbols.createStrokeText(ctx, 1, 150, buf, buf.length, font2);
dylib.symbols.fontTest(ctx, fo, fo.length, buf, buf.length);
const cc = await BLtoBuffer(createBL, ctx);
if(cc) Deno.writeFile("test/test10.png", cc);
ghe2d.close(createBL, ctx);


// ? functions scope

async function BLtoBuffer(createBL: Deno.PointerValue, ctx: Deno.PointerValue) {
    if(!dylib.symbols.imageIsValid(createBL)) {
        const size = new Uint32Array(1);
        const imgBuffer = await dylib.symbols.toData(createBL, ctx, size) as Deno.PointerObject;
        return new Deno.UnsafePointerView(imgBuffer).getArrayBuffer(size[0]) as Uint8Array;
    }
}

function color(red: number, green: number, blue: number, alpha: number) {
    return dylib.symbols.color(red, green, blue, alpha);
}

// const pName = new Deno.UnsafePointer();
// pName

// const name = (dylib.symbols.name()); 
// console.log(name);


// const buf = new TextEncoder().encode("Hello hlever saa بالعربي");
// dylib.symbols.print(buf, buf.byteLength);

// const result = dylib.symbols.sum(35, 34); // 69
// console.log(`Result from external addition of 35 + 34: ${result}`);

// const result2 = dylib.symbols.sub(35, 34); // 69
// console.log(`Result from external addition of 35 * 34: ${result2}`);

// const result3 = dylib.symbols.ssum(100, 34); // 69
// console.log(`Result from external addition of 35 * 34: ${result3}`);

// dylib.symbols.image();
// dylib.symbols.image1();