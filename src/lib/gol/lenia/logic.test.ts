import {describe, it} from "vitest";
import Enumerable from "linq";
import {initialFieldLenia, initialKernel} from "@/lib/gol/lenia/constants";
import {LeniaCalculator, LeniaCalculatorByFFT} from "@/lib/gol/lenia/logic";
// import {fft2d} from "@/lib/algorithm/fft/fft/fft2d/fft-2d";
// import {kernelExpand, kernelExpandAndShift} from "@/lib/gol/common/utils";
// import {Complex} from "@/lib/algorithm/fft/common/complex";

describe("lenia", () => {

  const kernel27x27 = initialKernel
  const leniaCalculatorNaive = new LeniaCalculator(kernel27x27, 0.15, 0.0185, 64);
  const leniaCalculatorFFT = new LeniaCalculatorByFFT(kernel27x27, 0.15, 0.0185, 64);

  let field = Enumerable.range(0, 64)
    .select(x => Enumerable.range(0, 64).select(x => 0).toArray())
    .toArray()

  for (let i = 0; i < initialFieldLenia.length; i++) {
    for (let j = 0; j < initialFieldLenia[i].length; j++) {
      field[i][j] = initialFieldLenia[i][j];
    }
  }

  describe('#calcNextGen', () => {
    it('blinker', () => {
      // refs : [ブリンカー (ライフゲーム) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AA%E3%83%B3%E3%82%AB%E3%83%BC_(%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0))

      const ret = leniaCalculatorNaive.calcNextGen(field);

      console.log(`ret--- --- ---`)
      for (let item of ret.map(x => x.toString())) {
        console.log(item)
      }

    })
  });

  describe('#calcNextGen2', () => {
    it('blinker', () => {
      // refs : [ブリンカー (ライフゲーム) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AA%E3%83%B3%E3%82%AB%E3%83%BC_(%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0))

      leniaCalculatorFFT.calcNextGen(field);

      console.log(`ret--- --- ---`)
      for (let item of field.map(x => x.toString())) {
        console.log(item)
      }

    })
  });


  // describe('#kernel test', () => {
  //   it('kernelExpandAndShift', () => {
  //
  //     const expandAndShift = kernelExpandAndShift(kernel27x27, 64)
  //     console.log(`ret--- --- ---`)
  //     for (let item of expandAndShift) {
  //       console.log(item.toString())
  //     }
  //
  //     const map = expandAndShift.map(x => x.map(x => {return {real:x, imag:0}}));
  //
  //     const fft2dRes = fft2d(64, map, false)
  //     console.log(`ret--- --- ---`)
  //     for (let item of fft2dRes.map(x => x.map(x=>x.real))) {
  //       console.log(item.toString())
  //     }
  //
  //     const invRes = fft2d(64, fft2dRes, true)
  //
  //     console.log(`ret--- --- ---`)
  //     for (let item of invRes.map(x => x.map(x=>Math.sqrt(x.getPowSq())))) {
  //       console.log(item.toString())
  //     }
  //
  //   })
  //
  //   it('kernelExpand', () => {
  //
  //     const kernelExpand1 = kernelExpand(kernel27x27, 64)
  //     for (let item of kernelExpand1) {
  //       console.log(item.toString())
  //     }
  //
  //     const map2 = kernelExpand1.map(x => x.map(x => new Complex(x, 0)));
  //     const fft2dRes2 = fft2d(64, map2, false)
  //     console.log(`ret--- --- ---`)
  //     for (let item of fft2dRes2.map(x => x.map(x=>x.real))) {
  //       console.log(item.toString())
  //     }
  //
  //     const invRes = fft2d(64, fft2dRes2, true)
  //
  //     console.log(`ret--- --- ---`)
  //     for (let item of invRes.map(x => x.map(x=>Math.sqrt(x.getPowSq())))) {
  //       console.log(item.toString())
  //     }
  //
  //   })
  // });

});


