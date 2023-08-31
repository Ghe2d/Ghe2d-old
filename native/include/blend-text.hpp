#include <blend2d.h>

class Glyph;
class Font;

extern "C" {
    void createFillText(BLContext ctx, float x, float y, char* text, int len, BLFont font);
    void createStrokeText(BLContext ctx, float x, float y, char* text, int len, BLFont font);
    void fillGlyphRun(BLContext ctx, BLFont font, const char* text, char nl, float x, float y);
    void strokeGlyphRun(BLContext ctx, BLFont font, const char* text, char nl, float x, float y);
    BLFont *createFont(char* fontPath, int len, float size);
    void destroyFont(Font *font);
    bool fontIsValid(BLFont font);
    void fontTest(BLContext ctx, char* fontPath, int len, char* text, int len2);
}