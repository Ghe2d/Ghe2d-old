#include <blend2d.h>
#include <iostream>
#include "../include/blend-context.hpp"

using namespace std;

BLContext* createBLContext(BLImage* img) {
    return new BLContext(* img);
}

void endCtx(BLContext ctx) {
    if(ctx._d.isContext())
        ctx.end();
}

void resetCtx(BLContext ctx) {
    if(ctx._d.isContext())
        ctx.reset();
}

void closeCtx(BLContext *ctx) {
    if(ctx->_d.isContext()) {
        ctx->reset();
        ctx->end();
        ctx->~BLContext();
        delete ctx;
    }
}

bool contextIsValid(BLContext ctx) {
    return ctx._d.isContext();
}

void save(BLContext ctx) {
    ctx.save();
}

void restore(BLContext ctx) {
    ctx.restore();
}

void restoreClipping(BLContext ctx) {
    ctx.restoreClipping();
}

void resetMatrix(BLContext ctx) {
    ctx.resetMatrix();
}

void clearAll(BLContext ctx) {
    if(ctx._d.isContext())
        ctx.clearAll();
}

void clearRect(BLContext ctx, float x, float y, float w, float h) {
    if(ctx._d.isContext())
        ctx.clearRect(x, y, w, h);
}

void fillAll(BLContext ctx) {
    if(ctx._d.isContext())
        ctx.fillAll();
}

void clipToRect(BLContext ctx, float x, float y, float w, float h) {
    if(ctx._d.isContext())
        ctx.clipToRect(x, y, w, h);
}

void fillRect(BLContext ctx, float x, float y, float w, float h) {
    if(ctx._d.isContext())
        ctx.fillRect(x, y, w, h);
}

void strokeRect(BLContext ctx, float x, float y, float w, float h) {
    if(ctx._d.isContext())
        ctx.strokeRect(x, y, w, h);
}

void fillRoundRect(BLContext ctx, float x, float y, float w, float h, float r) {
    if(ctx._d.isContext())
        ctx.fillRoundRect(x, y, w, h, r);
}

void strokeRoundRect(BLContext ctx, float x, float y, float w, float h, float r) {
    if(ctx._d.isContext())
        ctx.strokeRoundRect(x, y, w, h, r);
}

void fillCircle(BLContext ctx, float x, float y, float r) {
    if(ctx._d.isContext())
        ctx.fillCircle(x, y, r);
}

void strokeCircle(BLContext ctx, float x, float y, float r) {
    if(ctx._d.isContext())
        ctx.strokeCircle(x, y, r);
}

void fillBox(BLContext ctx, float x0, float y0, float x1, float y1) {
    if(ctx._d.isContext())
        ctx.fillBox(x0, y0, x1, y1);
}

void strokeBox(BLContext ctx, float x0, float y0, float x1, float y1) {
    if(ctx._d.isContext())
        ctx.strokeBox(x0, y0, x1, y1);
    // ctx.fillBoxArray()
    // ctx.fillGeometry();
    // ctx.fillGlyphRun();
    // ctx.fillMask();
    // ctx.fillPath();
    // ctx.fillPolygon();
    // ctx.strokePolyline();

    // ctx.setFillRule();
    // ctx.blitImage();
}

void fillChord(BLContext ctx, float x, float y, float r, float start, float sweep) {
    if(ctx._d.isContext())
        ctx.fillChord(x, y, r, start, sweep);
}

void strokeChord(BLContext ctx, float x, float y, float r, float start, float sweep) {
    if(ctx._d.isContext())
        ctx.strokeChord(x, y, r, start, sweep);
}


void fillEllipse(BLContext ctx, float x, float y, float rx, float ry) {
    if(ctx._d.isContext())
        ctx.fillEllipse(x, y, rx, ry);
}

void strokeEllipse(BLContext ctx, float x, float y, float rx, float ry) {
    if(ctx._d.isContext())
        ctx.strokeEllipse(x, y, rx, ry);
}

void fillPie(BLContext ctx, float x, float y, float rx, float ry, float start, float sweep) {
    if(ctx._d.isContext())
        ctx.fillPie(x, y, rx, ry, start, sweep);
}

void strokePie(BLContext ctx, float x, float y, float rx, float ry, float start, float sweep) {
    if(ctx._d.isContext())
        ctx.strokePie(x, y, rx, ry, start, sweep);
}

void fillTriangle(BLContext ctx, float x0, float y0, float x1, float y1, float x2, float y2) {
    if(ctx._d.isContext())
        ctx.fillTriangle(x0, y0, x1, y1, x2, y2);
}

void strokeTriangle(BLContext ctx, float x0, float y0, float x1, float y1, float x2, float y2) {
    if(ctx._d.isContext())
        ctx.strokeTriangle(x0, y0, x1, y1, x2, y2);
}

void strokeLine(BLContext ctx, float x0, float y0, float x1, float y1) {
    if(ctx._d.isContext())
        ctx.strokeLine(x0, y0, x1, y1);
}