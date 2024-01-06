import {describe, it} from "vitest";
import Enumerable from "linq";
import {initialFieldLenia, initialKernel} from "@/lib/gol/lenia/constants";
import {LeniaCalculator} from "@/lib/gol/lenia/logic";

describe("lenia", () => {

  const kernel27x27 = initialKernel
  const leniaCalculator = new LeniaCalculator(kernel27x27, 0.15, 0.0185, 64);

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

      const ret = leniaCalculator.calcNextGen(field);

      console.log(`ret--- --- ---`)
      for (let item of ret.map(x => x.toString())) {
        console.log(item)
      }

    })
  });

});


