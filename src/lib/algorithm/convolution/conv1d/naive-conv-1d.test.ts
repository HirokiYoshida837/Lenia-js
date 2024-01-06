import {describe, expect, it} from "vitest";
import {naiveCyclicConv1d, naiveLinearConv1d} from "@/lib/algorithm/convolution/conv1d/naive-conv-1d";

describe("naive-conv-1d", () => {

  describe('naiveLinearConv1d', () => {
    it('線形畳み込みができることのテスト', () => {

      const n = 16;
      const x = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0
      ]
      const h = [
        3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2
      ]
      const expected = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 6,
        3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0
      ]

      const ret = naiveLinearConv1d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })
  })

  describe('naiveCyclicConv1d', () => {
    it('循環畳み込みができることのテスト', () => {

      const n = 16;
      const x = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0
      ]
      const h = [
        3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2
      ]
      const expected = [
        3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 6,
      ]

      const ret = naiveCyclicConv1d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })
  })

});


