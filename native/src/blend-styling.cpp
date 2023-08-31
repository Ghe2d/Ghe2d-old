#include <blend2d.h>
#include "../include/blend-styling.hpp"


// #define BL_STROKE_WIDTH 1.0

uint32_t parce_uint32_t(int num) {
    return static_cast<uint32_t>(num);
}

BLRgba32 color(int red, int green, int blue, int alpha) {
    return BLRgba32(parce_uint32_t(red), parce_uint32_t(green), parce_uint32_t(blue), parce_uint32_t(alpha));
}

BLGradient *createLinearGradient(float x0, float y0, float x1, float y1) {
    return new BLGradient(BLLinearGradientValues(x0, y0, x1, y1));
}

BLGradient *createRadiaGradient(float x0, float y0, float x1, float y1, float r) {
    return new BLGradient(BLRadialGradientValues(x0, y0, x1, y1, r));
}

void addGradientStop(BLGradient gradient, float offset, BLRgba32 color) {
    if(gradient._d.isGradient())
        gradient.addStop(offset, color);
}

void gradientReset(BLGradient gradient) {
    if(gradient._d.isGradient())
        gradient.reset();
}

void gradientDelete(BLGradient *gradient) {
        if(gradient->_d.isGradient()) {
        gradient->reset();
        gradient->~BLGradient();
        delete gradient;
    }
}

bool gradientIsValid(BLGradient gradient) {
    return gradient._d.isGradient();
}

BLPattern *createPattern(BLImage img) {
    BLPattern *pattern;
    if(img._d.isImage()) {
        *pattern = BLPattern(img);
    }
    else {
        BLImage *img1;
        *pattern = BLPattern(*img1);
        pattern->reset();
        pattern->~BLPattern();
        delete pattern;
        img1->reset();
        img1->~BLImage();
        delete img1;
    }
    return pattern;
}

void patternReset(BLPattern pattern) {
    if(pattern._d.isPattern()) {
        pattern.reset();
    }
}

void patternDelete(BLPattern *pattern) {
    if(pattern->_d.isPattern()) {
        pattern->reset();
        pattern->~BLPattern();
        delete pattern;
    }
}

bool patternIsValid(BLPattern pattern) {
    return pattern._d.isPattern();
}

void setFillStyleRgba(BLContext ctx, BLRgba32 color) {
    if(ctx._d.isContext())
        ctx.setFillStyle(color);
}

void setFillStyleGradient(BLContext ctx, BLGradient gradient) {
    if(ctx._d.isContext())
        ctx.setFillStyle(gradient);
}

void setFillStylePattern(BLContext ctx, BLPattern pattern) {
    if(ctx._d.isContext())
        ctx.setFillStyle(pattern);
}

void setFillAlpha(BLContext ctx, float alpha) {
    if(ctx._d.isContext())
        ctx.setFillAlpha(alpha);
}

void setStrokeStyleRgba(BLContext ctx, BLRgba32 color) {
    if(ctx._d.isContext())
        ctx.setStrokeStyle(color);
}

void setStrokeStyleGradient(BLContext ctx, BLGradient gradient) {
    if(ctx._d.isContext())
        ctx.setStrokeStyle(gradient);
}

void setStrokeStylePattern(BLContext ctx, BLPattern pattern) {
    if(ctx._d.isContext())
        ctx.setStrokeStyle(pattern);
}

void setStrokeAlpha(BLContext ctx, float alpha) {
    if(ctx._d.isContext())
        ctx.setStrokeAlpha(alpha);
}

void setStrokeWidth(BLContext ctx, float width) {
    if(ctx._d.isContext())
        ctx.setStrokeWidth(width);
}

void setStrokeMiterLimit(BLContext ctx, float limit) {
    if(ctx._d.isContext())
        ctx.setStrokeMiterLimit(limit);
}

void setStrokeDashOffset(BLContext ctx, float offset) {
    if(ctx._d.isContext())
        ctx.setStrokeDashOffset(offset);
}

void setGlobalAlpha(BLContext ctx, float alpha) {
    if(ctx._d.isContext())
        ctx.setGlobalAlpha(alpha);
}

// void setStrokeStartCap(BLContext ctx, int cap) {
//     if(ctx._d.isContext())
//         ctx.setStrokeStartCap(cap);
// }

// void setStrokeEndCap(BLContext ctx, int cap) {
//     if(ctx._d.isContext())
//         ctx.setStrokeEndCap(cap);
// }

// void setCompOp(BLContext ctx) {
//     if(ctx._d.isContext())
//         ctx.setCompOp();
// }