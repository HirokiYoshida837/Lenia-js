import {describe, it} from "vitest";
import {fft1d} from "@/lib/algorithm/fft/fft/fft1d/fft-1d";
import {Complex} from "@/lib/algorithm/fft/common/complex";


describe("FFT test", () => {

  const a = [1, 2, 3, 4, 5, 6, 7, 8];

  it("FFTの挙動確認", () => {

    const fftRes = fft1d(a.length, a.map(x => {return {real:x, imag:0}}), false);
    console.log(fftRes)

    const invertFFTRes = fft1d(a.length, fftRes, true);
    console.log(invertFFTRes)
  })
})
