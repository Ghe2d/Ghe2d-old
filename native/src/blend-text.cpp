#include <blend2d.h>
#include <iostream>
#include "../include/blend-text.hpp"
#include <fribidi/fribidi.h>
#include <vector>

#include <locale>
#include <codecvt>

#include "../../ArabicString/ArabicString.h"

using namespace std;

class Glyph {
    private:
        BLGlyphBuffer *buffer;
        BLTextMetrics *metrics;
        BLFontMetrics *fontMetrics;
        float *x;
        float *y;
        bool * deleted;
    public:
        Glyph(BLFont font) {
            *fontMetrics = font.metrics();
        }
        ~Glyph() {
            if(!deleted) {
                buffer->reset();
                buffer->~BLGlyphBuffer();
                metrics->reset();
                metrics->~BLTextMetrics();
                fontMetrics->reset();
                fontMetrics->~BLFontMetrics();
                delete buffer;
                delete metrics;
                delete fontMetrics;
                delete x;
                delete y;
                *deleted = true;
            }
        }
        void fillGlyphRun(BLContext ctx, BLFont font, const char* text, char nl, float x, float y) {
            *this->y = y  + fontMetrics->ascent;
            do{
                const char* newLine = strchr(text, nl);
                buffer->setUtf8Text(text, newLine? newLine - text : strlen(text));
                font.shape(*buffer);
                font.getTextMetrics(*buffer, *metrics);
                *this->x = metrics->boundingBox.x1 - metrics->boundingBox.x0;
                ctx.fillGlyphRun(BLPoint((x - *this->x) / 2, *this->y), font, buffer->glyphRun());
                *this->y += fontMetrics->ascent + fontMetrics->descent + fontMetrics->lineGap;
                text = newLine ? newLine + 1 : nullptr;
            }
            while(text);
        }
        void strokeGlyphRun(BLContext ctx, BLFont font, const char* text, char nl, float x, float y) {
            *this->y = y  + fontMetrics->ascent;
            do{
                const char* newLine = strchr(text, nl);
                buffer->setUtf8Text(text, newLine? newLine - text : strlen(text));
                font.shape(*buffer);
                font.getTextMetrics(*buffer, *metrics);
                *this->x = metrics->boundingBox.x1 - metrics->boundingBox.x0;
                ctx.strokeGlyphRun(BLPoint((x - *this->x) / 2, *this->y), font, buffer->glyphRun());
                *this->y += fontMetrics->ascent + fontMetrics->descent + fontMetrics->lineGap;
                text = newLine? newLine + 1 : nullptr;
            }
            while(text);
        }
};

class Font {
    private:
        BLFontFace *face;
    public:
        BLFont *font;
        Font(const char* fontPath, float size) {
            face = new BLFontFace;
            font = new BLFont;
            BLResult result = face->createFromFile(fontPath);
            if (result!= BL_SUCCESS) {
                printf("Failed to create font face\n");
                face->reset();
                face->~BLFontFace();
                delete face;
                font->reset();
                font->~BLFont();
                delete font;
            }
            else {
                font->createFromFace(*face, size);
            }
        }
        ~Font() {
            if(face->_d.isFontFace())
                face->~BLFontFace();
            if(font->_d.isFont())
                font->~BLFont();
        }
        void destroy() {
            if(face->_d.isFontFace()) {
                face->reset();
                face->~BLFontFace();
                delete face;
            }
            if(font->_d.isFont()) {
                font->reset();
                font->~BLFont();
                delete font;
            }
        }
        bool isValid() {
            return font->_d.isFont();
        }
};

void createFillText(BLContext ctx, float x, float y, char* text, int len, BLFont font) {
    ctx.fillUtf8Text(BLPoint(x, y), font, string(text, len).c_str());
}

void createStrokeText(BLContext ctx, float x, float y, char* text, int len, BLFont font) {
    ctx.strokeUtf8Text(BLPoint(x, y), font, string(text, len).c_str());
}

void fillGlyphRun(BLContext ctx, BLFont font, const char* text, char nl, float x, float y) {
    Glyph glyph = Glyph(font);
    glyph.fillGlyphRun(ctx, font, text, nl, x, y);
}

void strokeGlyphRun(BLContext ctx, BLFont font, const char* text, char nl, float x, float y) {
    Glyph glyph = Glyph(font);
    glyph.strokeGlyphRun(ctx, font, text, nl, x, y);
}

BLFont *createFont(char* fontPath, int len, float size) {
    Font *font = new Font(string(fontPath, len).c_str(), size);
    return font->font;
}

void destroyFont(Font *font) {
    font->destroy();
    delete font;
}

bool fontIsValid(BLFont font) {
    return font._d.isFont();
}

void fontTest(BLContext ctx, char* fontPath, int len, char* text, int len2) {

    // hb_buffer_t *buf;
    // buf = hb_buffer_create();
    // hb_buffer_add_utf8(buf, string(text, len2).c_str(), -1, 0, -1);
    // // // hb_buffer_set_direction(buf, HB_DIRECTION_RTL);
    // // // hb_buffer_add_utf8(buf, string(text, len2).c_str(), strlen(string(text, len2).c_str()), 0, strlen(string(text, len2).c_str()));
    // // // hb_buffer_set_script(buf, HB_SCRIPT_LATIN);
    // // // hb_buffer_set_language(buf, hb_language_from_string("ar", -1));

    // // hb_buffer_guess_segment_properties(buf);

    // // hb_script_t script = hb_buffer_get_script(buf);
    // // hb_language_t language = hb_buffer_get_language(buf);
    // // hb_direction_t direction = hb_buffer_get_direction(buf);

    // // std::cout << "Script: " <<script << std::endl;
    // // std::cout << "Language: " << hb_language_to_string(language) << std::endl;
    // // std::cout << "Direction: " << (direction == HB_DIRECTION_LTR ? "LTR" : "RTL") << std::endl;

    // hb_blob_t *blob = hb_blob_create_from_file(string(fontPath, len).c_str());
    // hb_face_t *ft_face = hb_face_create(blob, 0);
    // hb_font_t *hb_font = hb_font_create(ft_face);

    // hb_shape(hb_font, buf, NULL, 0);

    // BLFontFace face;
    // face.createFromFile(string(fontPath, len).c_str());
    // BLFont font;
    // font.createFromFace(face, 20);

    // unsigned int glyph_count;
    // hb_glyph_info_t *glyph_info = hb_buffer_get_glyph_infos(buf, &glyph_count);
    // hb_glyph_position_t *glyph_pos = hb_buffer_get_glyph_positions(buf, &glyph_count);


    // BLGlyphBuffer glyphBuffer;
    // hb_codepoint_t* glyphData = new hb_codepoint_t[glyph_count];
    
    // for (unsigned int i = 0; i < glyph_count; i++) {
    //     glyphData[i] = glyph_info[i].codepoint;
    // }

    // char *data2 = new char[glyph_count];
    // size_t size = sizeof(glyphData) / sizeof(glyphData[0]);
    // for (unsigned int i = 0; i < glyph_count; i++) {
    //     char *data3 = new char[glyph_count];
    //     hb_font_glyph_to_string(hb_font, glyphData[i], data3, size);
    //     data2[i] = data3[i];
    // }
    // cout<<*data2<<endl;

    // cout<<endl<<"--"<<endl;
    // char *data = new char[glyph_count];
    // hb_font_glyph_to_string(hb_font, *glyphData, data, glyph_count);
    // cout<<*data<<endl;
    // glyphBuffer.setGlyphs(glyphData, glyph_count);
    // cout<<glyphBuffer.hasText()<<endl;
    // ctx.fillGlyphRun(BLPoint(10,100), font, glyphBuffer.glyphRun());

    BLFontFace face;
    face.createFromFile(string(fontPath, len).c_str());
    BLFont font;
    font.createFromFace(face, 20);

    // size_t lenn = mbstowcs(NULL, string(text, len2).c_str(), 0);

    // FriBidiParType baseDir = FRIBIDI_PAR_ON;
    // fribidi_get_par_direction(utf32Text, lenn);
    // cout << "Base direction: " << (baseDir == FRIBIDI_PAR_LTR ? "LTR" : "RTL") << endl;

    // cout << "1"<< endl;

    // FriBidiChar* reorderedText = new FriBidiChar[lenn + 1];

    // fribidi_log2vis(utf32Text, lenn, &baseDir, reorderedText, NULL, NULL, NULL);

    // cout << "Reordered text: " << (const wchar_t*)reorderedText << endl;

    // wstring wstr((const wchar_t*)reorderedText);

    // string str(wstr.begin(), wstr.end());

    // cout << "Reordered text: " << str << endl;
    // ctx.fillUtf8Text(BLPoint(50,50), font, str.c_str());



    char  text2[] = "ع مجس مسك احمد محسن عنب ضرط ط";
    size_t textLength = strlen(text2);

    // FriBidiChar* utf32Text = new FriBidiChar[textLength + 1];
    // mbstowcs((wchar_t*)utf32Text, text2, textLength + 1);

    // FriBidiCharSet charset = FRIBIDI_CHAR_SET_UTF8;
    // FriBidiFlags flags = FRIBIDI_FLAGS_DEFAULT | FRIBIDI_FLAGS_ARABIC;
    // FriBidiChar* visualText = new FriBidiChar[textLength + 1];

    // fribidi_charset_to_unicode(charset, text2, textLength, visualText);

    // const FriBidiLevel baseLevel = 0;
    // FriBidiLevel* embeddingLevels = new FriBidiLevel[textLength];
    // for (size_t i = 0; i < textLength; ++i) {
    //     embeddingLevels[i] = baseLevel;
    // }

    // FriBidiArabicProp *ar_props;
    // ar_props = (FriBidiArabicProp *)malloc(textLength * sizeof(FriBidiArabicProp));

    // FriBidiCharType* bidiTypes = new FriBidiCharType[textLength];
    // fribidi_get_bidi_types(visualText, textLength, bidiTypes);

    // fribidi_join_arabic(bidiTypes, textLength, embeddingLevels, ar_props);
    // // fribidi_shape_arabic(flags, embeddingLevels, textLength, ar_props, visualText);
    // fribidi_shape(flags, embeddingLevels, textLength, ar_props, visualText);

    // // FriBidiChar* reorderedText = new FriBidiChar[textLength + 1];
    // FriBidiParType baseDir = FRIBIDI_PAR_RTL; // FRIBIDI_PAR_LTR;

    // FriBidiChar* reorderedText = new FriBidiChar[textLength];

    // fribidi_log2vis(reinterpret_cast<const FriBidiChar*>(text2), textLength, &baseDir, reorderedText, NULL, NULL, NULL);

    // BLGlyphBuffer glyphBuffer;
    // glyphBuffer.setUtf32Text(visualText, textLength);
    // glyphBuffer.setWCharText((const wchar_t*)visualText, textLength);
    // ctx.fillUtf32Text(BLPoint(10,50), font, visualText);
    // ctx.fillGlyphRun(BLPoint(10, 50), font, glyphBuffer.glyphRun());
    // ArabicString::goArabic();
    wstring_convert<codecvt_utf8_utf16<wchar_t>, wchar_t> converter0;
    wstring ws = converter0.from_bytes(string(text, len2));
    wcout<<ws<<endl;
    ArabicString test = ws.c_str();
    test.makeShape();
    // const char * data = test.getText().c_str();
    wcout<<test.getText()<<endl;
    wcout << test.getShape() << endl;
    wcout << test.getReShape()<<endl;

    wstring_convert<codecvt_utf8<wchar_t>> converter;
    string s = converter.to_bytes(test.getReShape());
    
    ctx.fillUtf8Text(BLPoint(10, 50), font, s.c_str());
}

inline string to_string(const wstring& str, const locale& loc = locale{})
{
	vector<char> buf(str.size());
	use_facet<ctype<wchar_t>>(loc).narrow(str.data(), str.data() + str.size(), '?', buf.data());

	return string(buf.data(), buf.size());
}

