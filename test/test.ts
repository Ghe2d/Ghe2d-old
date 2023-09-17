import * as a from "../lib/ffi.ts";

a.print();
a.print1();
const b = await a.create_image();
// const c = a.print_width() as number;
// console.log(a.print_width());
// console.log(c.toString(2));

console.log(a.print_width("gg"));

a.test_buffer_return( new Uint8Array([16,2,3, 999, 10, 255]) );
a.get_ss({x: 120, y: 100});
console.log(a.test_ri(new Uint8Array([16, 2, 3, 255]), 100));
console.log(a.test_map());
console.log(a.test_add_map({m: JSON.parse(`{"gg": 120, "ui": 55, "gk_${"0232zsdsd"}": 130}`)}));
console.log(a.test_add_arr_map({m: JSON.parse(`{"gg": [120, 500, 111], "ui": [55, 66], "gk_${"0232zsdsd"}": [130, 99, 88]}`)}))
a.save_image(300, 300, {data: {a: [122], rect: [20, 20, 50, 50, 220, 15, 130, 120]}, text: null});
// console.log("\u0627\uFEE7\uFE96");


// const \u0627\uFEE7\uFE96= 100;
// const انت = 200;

// console.log(اﻧﺖ);
// // console.log(انت);

// console.log(اﻧﺖ == انت);

// key = shapes values = arg