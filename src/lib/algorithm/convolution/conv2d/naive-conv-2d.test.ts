import {describe, expect, it} from "vitest";
import {naiveCyclicConv2d, naiveLinearConv2d} from "@/lib/algorithm/convolution/conv2d/naive-conv-2d";

describe("naive-conv-2d", () => {

  describe('naiveLinearConv2d', () => {
    it('線形畳み込みができることのテスト - 1', () => {

      const n = 4;
      const x = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 0],
      ]

      const h = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]

      const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]

      const ret = naiveLinearConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

    it('線形畳み込みができることのテスト - 2', () => {

      const n = 4;
      const x = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 0],
      ]
      const h = [
        [3, 2, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]

      const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 9, 6, 0, 0, 0, 0],
        [0, 0, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]

      const ret = naiveLinearConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

    it('線形畳み込みができることのテスト - 3', () => {

      const n = 4;
      const x = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 0],
      ]
      const h = [
        [3, 2, 0, 2],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 0, 0],
      ]

      const expected = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 9, 6, 0, 6, 0, 0],
        [0, 0, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ]

      const ret = naiveLinearConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

    it('線形畳み込みができることのテスト - 4', () => {

      const n = 4;
      const x = [
        [1, 1, 1, 1],
        [1, 2, 2, 1],
        [1, 2, 2, 1],
        [1, 1, 1, 1],
      ];
      const h = [
        [0, 1, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ];

      const expected = [
        [0, 1, 1, 1, 1, 0, 0, 0],
        [1, 2, 4, 4, 2, 1, 0, 0],
        [1, 4, 6, 6, 4, 1, 0, 0],
        [1, 4, 6, 6, 4, 1, 0, 0],
        [1, 2, 4, 4, 2, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]

      const ret = naiveLinearConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })
  })

  describe('naiveCyclicConv2d', () => {
    it('循環畳み込みができることのテスト - 1', () => {

      const n = 4;
      const x = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 0],
      ]

      const h = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]

      const expected = [
        [0, 0, 0, 0,],
        [0, 0, 0, 0,],
        [0, 0, 3, 0,],
        [0, 0, 0, 0,],
      ]

      const ret = naiveCyclicConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

    it('循環畳み込みができることのテスト - 2', () => {

      const n = 4;
      const x = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 0],
      ]
      const h = [
        [3, 2, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]

      const expected = [
        [0, 0, 0, 0,],
        [0, 0, 0, 0,],
        [0, 0, 9, 6,],
        [0, 0, 6, 0,],
      ]

      const ret = naiveCyclicConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

    it('循環畳み込みができることのテスト - 3', () => {

      const n = 4;
      const x = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 0],
      ]
      const h = [
        [3, 2, 0, 2],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 0, 0, 0],
      ]

      const expected = [
        [0, 0, 0, 0,],
        [0, 0, 6, 0,],
        [0, 6, 9, 6,],
        [0, 0, 6, 0,],
      ]

      const ret = naiveCyclicConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })
  })

});


