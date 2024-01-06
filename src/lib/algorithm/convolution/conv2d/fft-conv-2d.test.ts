import {describe, expect, it} from "vitest";
import {fftLinearConv2d} from "@/lib/algorithm/convolution/conv2d/fft-conv-2d";

describe("fft-conv-2d", () => {

  describe('fftLinearConv1d', () => {
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

      const ret = fftLinearConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

  });

});




