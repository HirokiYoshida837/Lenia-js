import {describe, it} from "vitest";
import {fft2d} from "@/lib/algorithm/fft/fft/fft2d/fft-2d";
import Enumerable from "linq";


describe("fft-2d", () => {

  const l = 64;
  const t = 8;

  const input = new Array<Array<number>>()
  for (let i = 0; i < l; i++) {

    const arr = new Array<number>();
    for (let j = 0; j < l; j++) {
      arr.push(1 + Math.sin((2 * Math.PI / t) * j))
    }
    input.push(arr)
  }


  it("fft2dの挙動確認", () => {

    const a = Enumerable.from(input)
      .select(x => Enumerable.from(x).select(x => {
        return {real: x, imag: 0}
      }).toArray())
      .toArray()

    const fft2dRes = fft2d(l, a, false);
    // console.log(`---------------`)
    // const strings = Enumerable.from(fft2dRes).select(x => Enumerable.from(x).select(x => x.real).toArray()).toArray();
    // for (let item of strings) {
    //   console.log(item.toString())
    // }

    const invertFft2dRes = fft2d(l, fft2dRes, true);
    // console.log(`---------------`)
    // for (let item of invertFft2dRes.map(x=>x.map(y=>y.getPowSq()).map(y=>Math.sqrt(y)))){
    //   console.log(item.toString())
    // }


  })
})
