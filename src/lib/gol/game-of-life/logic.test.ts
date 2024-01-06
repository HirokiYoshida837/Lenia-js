import {describe, expect, it} from "vitest";
import {GameOfLifeCalculator} from "@/lib/gol/game-of-life/logic";

describe("game-of-life", () => {

  const calculator = new GameOfLifeCalculator(8);

  describe('#calcNextGen', () => {
    it('blinker', () => {
      // refs : [ブリンカー (ライフゲーム) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AA%E3%83%B3%E3%82%AB%E3%83%BC_(%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0))

      const field = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]

      const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]


      const ret = calculator.calcNextGen(field);

      // console.log(`ret--- --- ---`)
      // for (let item of ret.map(x => x.toString())) {
      //   console.log(item)
      // }
      //
      // console.log(`expected--- --- ---`)
      // for (let item of expected.map(x => x.toString())) {
      //   console.log(item)
      // }

      expect(ret).toEqual(expected)
    })

    it('blinker(cyclic)', () => {
      // refs : [ブリンカー (ライフゲーム) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AA%E3%83%B3%E3%82%AB%E3%83%BC_(%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0))

      const field = [
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
      ]

      const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 1],
      ]


      const ret = calculator.calcNextGen(field);

      // console.log(`ret--- --- ---`)
      // for (let item of ret.map(x => x.toString())) {
      //   console.log(item)
      // }
      //
      // console.log(`expected--- --- ---`)
      // for (let item of expected.map(x => x.toString())) {
      //   console.log(item)
      // }

      expect(ret).toEqual(expected)
    })


    it('glider', () => {
      // refs : [グライダー (ライフゲーム) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B0%E3%83%A9%E3%82%A4%E3%83%80%E3%83%BC_(%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0))

      const field = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]

      const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]


      const ret = calculator.calcNextGen(field);

      // console.log(`field--- --- ---`)
      // for (let item of field.map(x => x.toString())) {
      //   console.log(item)
      // }
      //
      // console.log(`ret--- --- ---`)
      // for (let item of ret.map(x => x.toString())) {
      //   console.log(item)
      // }
      //
      // console.log(`expected--- --- ---`)
      // for (let item of expected.map(x => x.toString())) {
      //   console.log(item)
      // }

      expect(ret).toEqual(expected)
    })

    it('glider(cyclic)', () => {
      // refs : [グライダー (ライフゲーム) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B0%E3%83%A9%E3%82%A4%E3%83%80%E3%83%BC_(%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0))

      const field = [
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 1],
      ]

      const expected = [
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
      ]


      const ret = calculator.calcNextGen(field);

      // console.log(`field--- --- ---`)
      // for (let item of field.map(x => x.toString())) {
      //   console.log(item)
      // }
      //
      // console.log(`ret--- --- ---`)
      // for (let item of ret.map(x => x.toString())) {
      //   console.log(item)
      // }
      //
      // console.log(`expected--- --- ---`)
      // for (let item of expected.map(x => x.toString())) {
      //   console.log(item)
      // }

      expect(ret).toEqual(expected)
    })

  })
});


