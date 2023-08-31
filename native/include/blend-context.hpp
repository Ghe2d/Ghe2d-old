#include <blend2d.h>

extern "C" {
    BLContext* createBLContext(BLImage* img);
    void endCtx(BLContext ctx);
    void resetCtx(BLContext ctx);
    void closeCtx(BLContext *ctx);
    bool contextIsValid(BLContext ctx);
    void save(BLContext ctx);
    void restore(BLContext ctx);
    void restoreClipping(BLContext ctx);
    void resetMatrix(BLContext ctx);
    void fillAll(BLContext ctx);
    void clearAll(BLContext ctx);
    void clearRect(BLContext ctx, float x, float y, float w, float h);
    void clipToRect(BLContext ctx, float x, float y, float w, float h);
    void fillRect(BLContext ctx, float x, float y, float w, float h);
    void strokeRect(BLContext ctx, float x, float y, float w, float h);
    void fillRoundRect(BLContext ctx, float x, float y, float w, float h, float r);
    void strokeRoundRect(BLContext ctx, float x, float y, float w, float h, float r);
    void fillCircle(BLContext ctx, float x, float y, float r);
    void strokeCircle(BLContext ctx, float x, float y, float r);
    void fillBox(BLContext ctx, float x0, float y0, float x1, float y1);
    void strokeBox(BLContext ctx, float x0, float y0, float x1, float y1);
    void fillChord(BLContext ctx, float x, float y, float r, float start, float sweep);
    void strokeChord(BLContext ctx, float x, float y, float r, float start, float sweep);
    void fillEllipse(BLContext ctx, float x, float y, float rx, float ry);
    void strokeEllipse(BLContext ctx, float x, float y, float rx, float ry);
    void fillPie(BLContext ctx, float x, float y, float rx, float ry, float start, float sweep);
    void strokePie(BLContext ctx, float x, float y, float rx, float ry, float start, float sweep);
    void fillTriangle(BLContext ctx, float x0, float y0, float x1, float y1, float x2, float y2);
    void strokeTriangle(BLContext ctx, float x0, float y0, float x1, float y1, float x2, float y2);
    void strokeLine(BLContext ctx, float x0, float y0, float x1, float y1);
}