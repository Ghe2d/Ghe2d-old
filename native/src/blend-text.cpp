#include <blend2d.h>
#include <iostream>
#include "../include/blend-text.hpp"
#include <fribidi/fribidi.h>
#include <vector>

#include <locale>
#include <codecvt>

#include <typeinfo>

#include <cctype>

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
    font.createFromFace(face, 25);

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
    const string txt = getArabicString(string(text, len2));
    string new_txt;

    ar_right_left(txt, new_txt);
    ctx.fillUtf8Text(BLPoint(10, 50), font, new_txt.c_str());
}

string getArabicString(string text) {
    wstring_convert<codecvt_utf8_utf16<wchar_t>, wchar_t> converter0;
    wstring ws = converter0.from_bytes(text);
    
    ArabicString ar_text = ws.c_str();
    ar_text.makeShape();

    wstring_convert<codecvt_utf8<wchar_t>> converter;
    string re_text = converter.to_bytes(ar_text.getReShape());
    return re_text;
}

size_t text_split(const string &txt, vector<string> &strs, char ch) {
    size_t pos = txt.find( ch );
    size_t initialPos = 0;
    strs.clear();

    while( pos != string::npos ) {
        strs.push_back( txt.substr( initialPos, pos - initialPos ) );
        initialPos = pos + 1;
        pos = txt.find( ch, initialPos );
    }

    strs.push_back( txt.substr( initialPos, min( pos, txt.size() ) - initialPos + 1 ) );

    return strs.size();
}

bool containsOnlyEnglish(string const &str) {
	return str.find_first_not_of(
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890\\`'!@#$%^&*()_-=+{}~<>\":;?/.,") ==
		string::npos;
}

void reverse(string const &txt, string &str) {
	for (int i = txt.length() - 1,j=0; i >= 0; i--,j++)
		str += txt[i];
}

void ar_right_left(const string text, string &str) {
    bool right = !isalpha(text[text.length() - 1]);
    vector<string> split_txt_first;
    string after_reverce;
    size_t size = text_split(text, split_txt_first, ' ');
    for(size_t i = 0; i < size; i++) {
        if(containsOnlyEnglish(split_txt_first[i])) {
            string reverse_txt;
            reverse(split_txt_first[i], reverse_txt);
            after_reverce += reverse_txt;
        }
        else {
            size_t eng_len = 0;
            for(size_t j = 0; j< split_txt_first[i].length(); j++) {
                if(isalpha(split_txt_first[i][j])) eng_len++;
            }
            if(eng_len > 0) {
                int index = 0;
                int end = 0;
                string sub_txt;
                for(size_t j = 0; j< split_txt_first[i].length(); j++) {
                    if(isalpha(split_txt_first[i][j])) {
                        if(index == 0) index = j + 1;
                        else end++;
                    }
                    else if(index != 0 && end != 0) {
                        string reverse_txt;
                        reverse(split_txt_first[i].substr(index - 1, end + 1), reverse_txt);
                        for(size_t k = 0; k < reverse_txt.length(); k++) {
                            sub_txt += reverse_txt[k];
                        }
                        sub_txt += split_txt_first[i][j];
                        index = 0;
                        end = 0;
                    }
                    else {
                        if(index != 0) 
                            sub_txt += split_txt_first[i][index - 1];
                        index = 0;
                        end = 0;
                        sub_txt += split_txt_first[i][j];
                    }
                }
                if(index != 0 && end != 0) {
                    string reverse_txt;
                    reverse(split_txt_first[i].substr(index - 1, end + 1), reverse_txt);
                    for(size_t k = 0; k < reverse_txt.length(); k++)
                        sub_txt += reverse_txt[k];
                }
                else if(index != 0) {
                    sub_txt += split_txt_first[i][index - 1];
                }
                after_reverce += sub_txt;
            }
            else after_reverce += split_txt_first[i];
        }
        if(i < size - 1) after_reverce += " ";
    }
    
    string after_reverce_2;
    if(!right) {
        vector<string> split_txt_seconde;
        size_t size_2 = text_split(after_reverce, split_txt_seconde, ' ');
        for (int i = size_2 - 1,j=0; i >= 0; i--,j++) {
            after_reverce_2 += split_txt_seconde[i];
            if(i > 0) after_reverce_2 += " ";
        }
    }

    vector<string> split_txt_third;
    size_t size_3 = text_split(right ? after_reverce : after_reverce_2, split_txt_third, ' ');
    int index = 0;
    int end = 0;
    for(size_t i = 0; i < size_3; i++) {
        if(right && containsOnlyEnglish(split_txt_third[i])) {
            if(index == 0) index = i + 1;
            else end++;
        }
        else if(!right && !containsOnlyEnglish(split_txt_third[i])) {
            if(index == 0) index = i + 1;
            else end++;
        }
        else if(index != 0 && end != 0) {
        	for (int j = end,k=0; j >= 0; j--,k++) {
                str += split_txt_third[index - 1 + j];
                str += " ";
            }
            str += split_txt_third[i];
            if(i < size_3 - 1) str += " ";
            index = 0;
            end = 0;
        }
        else {
            if(index != 0) {
                str += split_txt_third[index - 1];
                str += " ";
            }
            index = 0;
            end = 0;
            str += split_txt_third[i];
            if(i < size_3 - 1) str += " ";
        }
    }
    if(index != 0 && end != 0) {
        for (int j = end,k=0; j >= 0; j--,k++) {
            str += split_txt_third[index - 1 + j];
            if(j > 0) str += " ";
        }
    }
    else if(index != 0) {
        // str += " ";
        str += split_txt_third[index - 1];
    }
}