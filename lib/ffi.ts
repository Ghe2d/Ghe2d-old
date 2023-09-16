import {existsSync} from "https://deno.land/std@0.197.0/fs/mod.ts";
import {__dirname} from "./utilty.ts";

if(!existsSync(`${__dirname()}/../bindings`,{isDirectory: true}) || !existsSync(`${__dirname()}/../target`,{isDirectory: true})) {
    if(existsSync(`${__dirname()}/../target`,{isDirectory: true})) Deno.removeSync(`${__dirname()}/../target`, { recursive: true });
    new TextDecoder().decode(new Deno.Command("deno_bindgen").outputSync().stdout);
}

export * from "../bindings/bindings.ts";