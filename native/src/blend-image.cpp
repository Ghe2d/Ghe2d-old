#include <blend2d.h>
#include <iostream>
#include "../include/blend-image.hpp"

using namespace std;

BLImage* createBLImage(int w, int h) {
    return new BLImage(w, h, BL_FORMAT_PRGB32);
}

void closeImage(BLImage* img) {
    if(img->_d.isImage()) {
        img->reset();
        img->~BLImage();
        delete img;
    }
}

void resetImage(BLImage img) {
    if(img._d.isImage()) {
        img.reset();
    }
}

bool imageIsValid(BLImage img) {
    return !img._d.isImage();
}

void close(BLImage* img, BLContext* ctx) {
    if(img->_d.isImage()) {
        img->reset();
        img->~BLImage();
        delete img;
        }
    if(ctx->_d.isContext()) {
        ctx->reset();
        ctx->end();
        ctx->~BLContext();
        delete ctx;
    }
}

void reset(BLImage img, BLContext ctx) {
    if(img._d.isImage() && ctx._d.isContext()) {
        ctx.reset();
        img.reset();
    }
}

const uint8_t * toData(BLImage img, BLContext ctx, size_t *size) {
    if(img._d.isImage() && ctx._d.isContext()) {
        BLImageCodec codec;
        codec.findByName("PNG");
        BLArray<uint8_t> buffer;
        img.writeToData(buffer, codec);
        *size = buffer.size();
        return buffer.data();
    }
    return {};
}

void saveImage(BLImage img, BLContext ctx, char* buf, int len) {
    if(img._d.isImage() && ctx._d.isContext())
        img.writeToFile(string(buf, len).c_str());
}

BLImage *loadImage(char* buf, int len) {
    BLImage *img;
    BLResult err = img->readFromFile(string(buf, len).c_str());
    if (err != BL_SUCCESS) {
        printf("Failed load a image (err=%u)\n", err);
        img->reset();
        img->~BLImage();
        delete img;
    }
    return img;
}