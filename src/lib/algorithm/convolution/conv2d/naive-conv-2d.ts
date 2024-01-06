import Enumerable from "linq";

/**
 * 周期 n の離散信号(2次元)同士の線形畳み込み[Linear Convolution]を行います。
 * ナイーブに処理を行うため、計算量は `O(n^4)`となっています。
 * <br/>
 * 動作イメージはこちらを参考にしてください : [直線畳み込みと循環畳み込み](https://vrlab.meijo-u.ac.jp/edu/linear-and-cyclic-convolution.html) <br/>
 * refs : [線形および循環畳み込み - MATLAB & Simulink - MathWorks 日本](https://jp.mathworks.com/help/signal/ug/linear-and-circular-convolution_ja_JP.html)
 * @param f 元信号
 * @param g カーネル信号
 * @param n 1辺の要素数 (2べき)
 */
export const naiveLinearConv2d = (f: number[][], g: number[][], n: number): number[][] => {

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

  const ret = Enumerable.range(0, 2 * n)
    .select(x => Enumerable.range(0, 2 * n).select(y => 0).toArray())
    .toArray();

  // ナイーブに畳み込み処理を計算する。計算量は O(n^4) となる。
  for (let fi = 0; fi < n; fi++) {
    for (let fj = 0; fj < n; fj++) {

      const fij = f[fi][fj]

      for (let gi = 0; gi < n; gi++) {
        for (let gj = 0; gj < n; gj++) {

          // console.log(`gi:${gi}, gj:${gj}, g[gi][gj]:${g[gi][gj]}`)
          // console.log(`fij: ${fij}`)
          const v = fij * g[gi][gj]
          // console.log(`v: ${v}`)

          ret[fi + gi][fj + gj] += fij * g[gi][gj]
        }
      }
    }
  }

  // console.log(ret)

  return ret;
}

/**
 * 周期 n の離散信号(2次元)同士の線形畳み込み[Cyclic Convolution]を行います。
 * ナイーブに処理を行うため、計算量は `O(n^4)`となっています。
 * <br/>
 * 動作イメージはこちらを参考にしてください : [直線畳み込みと循環畳み込み](https://vrlab.meijo-u.ac.jp/edu/linear-and-cyclic-convolution.html) <br/>
 * refs : [線形および循環畳み込み - MATLAB & Simulink - MathWorks 日本](https://jp.mathworks.com/help/signal/ug/linear-and-circular-convolution_ja_JP.html)
 * @param f 元信号
 * @param g カーネル信号
 * @param n 1辺の要素数 (2べき)
 */
export const naiveCyclicConv2d = (f: number[][], g: number[][], n: number): number[][] => {

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

  const ret = Enumerable.range(0, n)
    .select(x => Enumerable.range(0, n).select(y => 0).toArray())
    .toArray();

  // ナイーブに畳み込み処理を計算する。計算量は O(n^4) となる。
  for (let fi = 0; fi < n; fi++) {
    for (let fj = 0; fj < n; fj++) {

      const fij = f[fi][fj]

      for (let gi = 0; gi < n; gi++) {
        for (let gj = 0; gj < n; gj++) {

          // console.log(`gi:${gi}, gj:${gj}, g[gi][gj]:${g[gi][gj]}`)
          // console.log(`fij: ${fij}`)
          const v = fij * g[gi][gj]
          // console.log(`v: ${v}`)

          ret[(fi + gi) % n][(fj + gj) % n] += fij * g[gi][gj]
        }
      }
    }
  }

  // console.log(ret)

  return ret;
}
