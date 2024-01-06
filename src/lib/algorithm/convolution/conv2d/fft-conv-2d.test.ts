import {describe, expect, it} from "vitest";
import {fftCyclicConv2d, fftCyclicConv2dByGivenFreqDomainKernel} from "@/lib/algorithm/convolution/conv2d/fft-conv-2d";
import {fft2d} from "@/lib/algorithm/fft/fft2d/fft-2d";
import Enumerable from "linq";
import {Complex} from "@/lib/algorithm/fft/common/complex";

describe("fft-conv-2d", () => {

  describe('fftCyclicConv2d', () => {
    it('循環畳み込みができることのテスト - 4', () => {

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
        [4, 4, 5, 5],
        [4, 4, 5, 5],
        [5, 5, 6, 6],
        [5, 5, 6, 6],
      ]

      const ret = fftCyclicConv2d(x, h, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

  });

  describe('fftCyclicConv2dByGivenFreqDomainKernel', () => {
    it('循環畳み込みができることのテスト - 4', () => {

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
        [4, 4, 5, 5],
        [4, 4, 5, 5],
        [5, 5, 6, 6],
        [5, 5, 6, 6],
      ]

      const freqDomainH = fft2d(4, Enumerable.from(h).select(x => Enumerable.from(x).select(x => new Complex(x, 0)).toArray()).toArray(), false);
      const ret = fftCyclicConv2dByGivenFreqDomainKernel(x, freqDomainH, n)

      console.log(ret)

      expect(ret).toEqual(expected)
    })

  });

});




