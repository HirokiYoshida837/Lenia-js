
import Enumerable from "linq";
import {Complex} from "@/lib/algorithm/fft/common/complex";


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

  const tmp = Enumerable.range(0, sz).select(x=>new Complex(0,0)).toArray()

  const mask = sz - 1
  let p = 0
  // 再帰じゃないFFT
  for (let i = sz >> 1; i >= 1; i >>= 1) {
    const cur = p & 1 ? tmp : a
    const nex = p & 1 ? a : tmp
    const e = Complex.polar(1, (2 * Math.PI * i * (inv ? -1 : 1)) / sz)
    let w = new Complex(1, 0)
    for (let j = 0; j < sz; j += i) {
      for (let k = 0; k < i; k++) {
        nex[j + k] = cur[((j << 1) & mask) + k].add(cur[(((j << 1) + i) & mask) + k].multiply(w))
      }
      w = w.multiply(e)
    }
    p++
  }
  const r = p & 1 ? tmp : a
  if (inv) for (let i = 0; i < sz; i++) r[i] = r[i].div(sz)
  return r
}
