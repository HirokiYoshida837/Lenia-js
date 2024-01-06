import Enumerable from "linq";
import {fft2d} from "@/lib/algorithm/fft/fft2d/fft-2d";
import {Complex} from "@/lib/algorithm/fft/common/complex";

/**
 * 周期 n の離散信号(2次元)同士の線形畳み込み[Cyclic Convolution]を行います。
 * FFTを利用して畳み込み処理を行うため、計算量は ... となっています。
 * <br/>
 * 動作イメージはこちらを参考にしてください : [直線畳み込みと循環畳み込み](https://vrlab.meijo-u.ac.jp/edu/linear-and-cyclic-convolution.html) <br/>
 * refs : [線形および循環畳み込み - MATLAB & Simulink - MathWorks 日本](https://jp.mathworks.com/help/signal/ug/linear-and-circular-convolution_ja_JP.html)
 * @param f 元信号
 * @param g カーネル信号
 * @param n 1辺の要素数 (2べき)
 */
export const fftCyclicConv2d = (f: number[][], g: number[][], n: number): number[][] => {

  if (f.length != n) {
    throw new Error('Illegal argument. f.length is not equal n')
  }

  if (!Enumerable.from(f).select(x => x.length == n).all(x => x)) {
    throw new Error('Illegal argument. f is not n square matrix')
  }

  if (g.length != n) {
    throw new Error('Illegal argument. f.length is not equal n')
  }

  if (!Enumerable.from(g).select(x => x.length == n).all(x => x)) {
    throw new Error('Illegal argument. f is not n square matrix')
  }

  // const ret = Enumerable.range(0, 2 * n)
  //   .select(x => Enumerable.range(0, 2 * n).select(y => 0).toArray())
  //   .toArray();

  const fComp = Enumerable.from(f).select(x => Enumerable.from(x).select(x => new Complex(x, 0)).toArray()).toArray();
  const gComp = Enumerable.from(g).select(x => Enumerable.from(x).select(x => new Complex(x, 0)).toArray()).toArray();

  const inputFFT = fft2d(n, fComp, false);
  const kernelFFT = fft2d(n, gComp, false);

  // console.log(`----------`)
  //
  // for (let item of inputFFT) {
  //   console.log(item.map(x => x.real).toString())
  // }

  // console.log(`----------`)
  //
  // for (let item of kernelFFT) {
  //   console.log(item.map(x => x.real).toString())
  // }

  // 要素ごとの積(アダマール積)を取る
  const multComplex = new Array<Array<Complex>>();
  for (let i = 0; i < inputFFT.length; i++) {

    const cps = new Array<Complex>();

    for (let j = 0; j < inputFFT.length; j++) {
      const complex = inputFFT[i][j].multiply(kernelFFT[i][j]);
      cps.push(complex);
    }
    multComplex.push(cps);
  }

  // console.log(`----------`)
  //
  // for (let item of multComplex) {
  //   console.log(item.map(x => x.real).toString())
  // }

  // 逆FFTする
  const invFFTResult = fft2d(n, multComplex, true);

  // console.log(`----------`)
  // for (let item of invFFTResult) {
  //   console.log(item.map(x => x.real).toString())
  // }

  const ret = Enumerable.from(invFFTResult)
    .select(x => Enumerable.from(x)
      .select(x => x.getPowSq())
      .select(x => Math.sqrt(x))
      .toArray()
    ).toArray();

  return ret;
}

/**
 * 周期 n の離散信号(2次元)同士の線形畳み込み[Cyclic Convolution]を行います。
 * FFTを利用して畳み込み処理を行うため、計算量は ... となっています。
 * <br/>
 * 動作イメージはこちらを参考にしてください : [直線畳み込みと循環畳み込み](https://vrlab.meijo-u.ac.jp/edu/linear-and-cyclic-convolution.html) <br/>
 * refs : [線形および循環畳み込み - MATLAB & Simulink - MathWorks 日本](https://jp.mathworks.com/help/signal/ug/linear-and-circular-convolution_ja_JP.html)
 * @param f 元信号
 * @param G カーネル信号(周波数ドメインに変換済)
 * @param n 1辺の要素数 (2べき)
 */
export const fftCyclicConv2dByGivenFreqDomainKernel = (f: number[][], G: Complex[][], n: number): number[][] => {

  if (f.length != n) {
    throw new Error('Illegal argument. f.length is not equal n')
  }

  if (!Enumerable.from(f).select(x => x.length == n).all(x => x)) {
    throw new Error('Illegal argument. f is not n square matrix')
  }

  if (G.length != n) {
    throw new Error('Illegal argument. f.length is not equal n')
  }

  if (!Enumerable.from(G).select(x => x.length == n).all(x => x)) {
    throw new Error('Illegal argument. f is not n square matrix')
  }

  const fComp = Enumerable.from(f).select(x => Enumerable.from(x).select(x => new Complex(x, 0)).toArray()).toArray();

  const inputFFT = fft2d(n, fComp, false);
  // kernelは事前にFFT済。
  const kernelFFT = G

  // 要素ごとの積(アダマール積)を取る
  const multComplex = new Array<Array<Complex>>();
  for (let i = 0; i < inputFFT.length; i++) {

    const cps = new Array<Complex>();

    for (let j = 0; j < inputFFT.length; j++) {
      const complex = inputFFT[i][j].multiply(kernelFFT[i][j]);
      cps.push(complex);
    }
    multComplex.push(cps);
  }

  // 逆FFTする
  const invFFTResult = fft2d(n, multComplex, true);

  const ret = Enumerable.from(invFFTResult)
    .select(x => Enumerable.from(x)
      .select(x => x.getPowSq())
      .select(x => Math.sqrt(x))
      .toArray()
    ).toArray();

  return ret;
}
