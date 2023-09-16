import * as a from "../lib/ffi.ts";

a.print();
a.print1();
const b = await a.create_image();
// const c = a.print_width() as number;
// console.log(a.print_width());
// console.log(c.toString(2));

console.log(a.print_width("gg").toString(2));



// console.log("\u0627\uFEE7\uFE96");


// const \u0627\uFEE7\uFE96= 100;
// const انت = 200;

// console.log(اﻧﺖ);
// // console.log(انت);

// console.log(اﻧﺖ == انت);