import {describe, it} from "vitest";
import Enumerable from "linq";
import {initialFieldLenia} from "@/lib/gol/lenia/constants";
import {calcNextGen} from "@/lib/gol/lenia/logic";

describe("lenia", () => {

  describe('#calcNextGen', () => {
    it('テスト', () => {

      let field = Enumerable.range(0, 64)
        .select(x => Enumerable.range(0, 64).select(x => 0).toArray())
        .toArray()

      for (let i = 0; i < initialFieldLenia.length; i++) {
        for (let j = 0; j < initialFieldLenia[i].length; j++) {
          field[i][j] = initialFieldLenia[i][j];
        }
      }

      console.log(`field--- --- ---`)
      for (let item of field.map(x => x.toString())) {
        console.log(item)
      }

      const shiftedKernel = calcNextGen(field, 64);
      console.log(`kernel--- --- ---`)
      for (let item of shiftedKernel.map(x => x.toString())) {
        console.log(item)
      }








    })
  });
});


