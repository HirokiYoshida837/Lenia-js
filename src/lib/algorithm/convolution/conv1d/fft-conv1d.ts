import {fft1d} from "@/lib/algorithm/fft/fft1d/fft-1d";
import Enumerable from "linq";
import {Complex} from "@/lib/algorithm/fft/fft1d/complex";


/**
 * 1次元のConvolutionを行います。
 * @param a
 * @param b
 * @param n
 */
export function fftLinearConv1d(a: number[], b: number[], n: number): number[] {

  const m = a.length + b.length - 1
  let sz = 1
  while (m > sz) sz <<= 1

  if (n * 2 != sz) {
    throw new Error('illegal argument. size is invalid')
  }

  let A = Enumerable.range(0, sz).select(x => new Complex(0, 0)).toArray()
  let B = Enumerable.range(0, sz).select(x => new Complex(0, 0)).toArray()


  for (let i = 0; i < a.length; i++) A[i] = new Complex(a[i], 0)
  for (let i = 0; i < b.length; i++) B[i] = new Complex(b[i], 0)
  A = fft1d(sz, A)
  B = fft1d(sz, B)
  for (let i = 0; i < sz; ++i) A[i] = A[i].multiply(B[i])
  A = fft1d(sz, A, true)


  const ret = Enumerable.from(A)
    .select(x => x.real)
    // jsでは -0 を取ることがあるので 0 を足してあげる
    .select(x => Math.round(x) + 0)
    .toArray();

  return ret;
}

/**
 * 1次元のConvolutionを行います。
 * @param a
 * @param b
 * @param n
 */
export function fftCyclicConv1d(a: number[], b: number[], n: number): number[] {

  const m = a.length + b.length - 1
  let sz = 1
  while (m > sz) sz <<= 1

  if (n * 2 != sz) {
    throw new Error('illegal argument. size is invalid')
  }

  let A = Enumerable.range(0, sz).select(x => new Complex(0, 0)).toArray()
  let B = Enumerable.range(0, sz).select(x => new Complex(0, 0)).toArray()


  for (let i = 0; i < a.length; i++) A[i] = new Complex(a[i], 0)
  for (let i = 0; i < b.length; i++) B[i] = new Complex(b[i], 0)
  A = fft1d(sz, A)
  B = fft1d(sz, B)
  for (let i = 0; i < sz; ++i) A[i] = A[i].multiply(B[i])
  A = fft1d(sz, A, true)


  const realPart = Enumerable.from(A)
    .select(x => x.real)
    // jsでは -0 を取ることがあるので 0 を足してあげる
    .select(x => Math.round(x) + 0)
    .toArray();

  const ret = Enumerable.range(0, n)
    .select(x => 0)
    .toArray();

  // 循環畳み込みにする
  for (let i = 0; i < realPart.length; i++) {
    ret[i % n] += realPart[i]
  }

  return ret;
}
