#include <blend2d.h>

extern "C" {
    BLRgba32 color(int red, int green, int blue, int alpha);
    BLGradient *createLinearGradient(float x0, float y0, float x1, float y1);
    BLGradient *createRadiaGradient(float x0, float y0, float x1, float y1, float r);
    void addGradientStop(BLGradient gradient, float offset, BLRgba32 color);
    void gradientReset(BLGradient gradient);
    void gradientDelete(BLGradient *gradient);
    bool gradientIsValid(BLGradient gradient);
    BLPattern *createPattern(BLImage img);
    void patternReset(BLPattern pattern);
    void patternDelete(BLPattern *pattern);
    bool patternIsValid(BLPattern pattern);
    void setFillStyleRgba(BLContext ctx, BLRgba32 color);
    void setFillStyleGradient(BLContext ctx, BLGradient gradient);
    void setFillStylePattern(BLContext ctx, BLPattern pattern);
    void setFillAlpha(BLContext ctx, float alpha);
    void setStrokeStyleRgba(BLContext ctx, BLRgba32 color);
    void setStrokeStyleGradient(BLContext ctx, BLGradient gradient);
    void setStrokeStylePattern(BLContext ctx, BLPattern pattern);
    void setStrokeAlpha(BLContext ctx, float alpha);
    void setStrokeWidth(BLContext ctx, float width);
    void setStrokeMiterLimit(BLContext ctx, float limit);
    void setStrokeDashOffset(BLContext ctx, float offset);
    void setGlobalAlpha(BLContext ctx, float alpha);
}

uint32_t parce_uint32_t(int num);