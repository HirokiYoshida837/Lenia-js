import {describe, expect, it} from "vitest";
import {fftCyclicConv1d, fftLinearConv1d} from "@/lib/algorithm/convolution/conv1d/fft-conv1d";

describe("fft-conv-1d", () => {

  describe('fftLinearConv1d', () => {
    it('線形畳み込みができることのテスト - 1', () => {

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

      const ret = fftLinearConv1d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

  })

  describe('fftLinearConv1d', () => {
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

      const ret = fftCyclicConv1d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })
  })

});


