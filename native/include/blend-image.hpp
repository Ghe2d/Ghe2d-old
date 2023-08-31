#include <blend2d.h>

extern "C" {
    BLImage* createBLImage(int w, int h);
    void closeImage(BLImage* img);
    void resetImage(BLImage img);
    bool imageIsValid(BLImage img);
    void close(BLImage* img, BLContext* ctx);
    void reset(BLImage img, BLContext ctx);
    void saveImage(BLImage img, BLContext ctx, char* buf, int len);
    BLImage *loadImage(char* buf, int len);
    const uint8_t * toData(BLImage img, BLContext ctx, size_t *size);
}

