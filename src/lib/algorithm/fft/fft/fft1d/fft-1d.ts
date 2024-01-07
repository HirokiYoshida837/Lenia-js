import {Complex, ComplexAdd, ComplexDiv, ComplexMultiply, ComplexPolar} from "@/lib/algorithm/fft/common/complex";


/**
 * refs : [提出 #23866021 - AtCoder Typical Contest 001](https://atcoder.jp/contests/atc001/submissions/23866021)
 * <br/>
 * refs : [FFT (高速フーリエ変換)](https://satanic0258.github.io/snippets/math/FFT.html)
 * <br/>
 * @param sz
 * @param a
 * @param inv 逆フーリエ変換を行うか? default = false
 */
export function fft1d(sz: number, a: Complex[], inv = false): Complex[] {

  const tmp: Complex[] = Array(sz).fill({real: 0, imag: 0})

  const mask = sz - 1
  let p = 0
  // 再帰じゃないFFT
  for (let i = sz >> 1; i >= 1; i >>= 1) {
    const cur = p & 1 ? tmp : a
    const nex = p & 1 ? a : tmp
    const e = ComplexPolar(1, (2 * Math.PI * i * (inv ? -1 : 1)) / sz)
    let w = {real: 1, imag: 0}
    for (let j = 0; j < sz; j += i) {
      for (let k = 0; k < i; k++) {
        nex[j+k] = ComplexAdd(cur[((j << 1) & mask) + k], ComplexMultiply(cur[(((j << 1) + i) & mask) + k],w))
      }
      w = ComplexMultiply(w,e)
    }
    p++
  }
  const r = p & 1 ? tmp : a
  if (inv) for (let i = 0; i < sz; i++) r[i] = ComplexDiv(r[i], sz)
  return r
}
