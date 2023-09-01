#include <blend2d.h>
#include <iostream>
#include <vector>

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

std::string getArabicString(std::string text);

size_t text_split(const std::string &txt, std::vector<std::string> &strs, char ch);
bool containsOnlyEnglish(std::string const &str);
void reverse(std::string const &txt, std::string &str);
void ar_right_left(const std::string text, std::string &str);