import {describe, expect, it} from "vitest";
import {naiveLinearConv2d} from "@/lib/algorithm/convolution/conv2d/naive-conv-2d";

describe("naive-conv-2d", () => {

  describe('naiveLinearConv1d', () => {
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
  })

});


