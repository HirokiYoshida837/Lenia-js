import {describe, it} from "vitest";
import {fft1d} from "@/lib/algorithm/fft/fft1d/fft-1d";
import {Complex} from "@/lib/algorithm/fft/fft1d/complex";


describe("FFT test", () => {

  const a = [1, 2, 3, 4, 5, 6, 7, 8];

  it("FFTの挙動確認", () => {

    const complexes = fft1d(a.length, a.map(x => new Complex(x, 0)), false);
    console.log(complexes)
  })
})
