import * as path from "https://deno.land/std@0.197.0/path/mod.ts";

export function __dirname() {
    return path.dirname(path.fromFileUrl(import.meta.url));
}

export function __filename() {
    return path.fromFileUrl(import.meta.url);
}