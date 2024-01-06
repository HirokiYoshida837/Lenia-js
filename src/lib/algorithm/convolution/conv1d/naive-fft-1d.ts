/**
 * 周期 n の離散信号同士の線形(直線)畳み込みを行います。
 * ナイーブに処理を行うため、計算量は `O(n^2)`となっています。
 * <br/>
 * 動作イメージはこちらを参考にしてください : [直線畳み込みと循環畳み込み](https://vrlab.meijo-u.ac.jp/edu/linear-and-cyclic-convolution.html) <br/>
 * refs : [線形および循環畳み込み - MATLAB & Simulink - MathWorks 日本](https://jp.mathworks.com/help/signal/ug/linear-and-circular-convolution_ja_JP.html)
 * @param f 元信号
 * @param g カーネル信号
 * @param n 要素数 (2べき)
 */
export const naiveLinerConv1d = (f: number[], g: number[], n: number): number[] => {

  if (f.length != g.length) {
    throw new Error('Illegal argument. f and g are not same size.')
  }

  if (f.length != n) {
    throw new Error('Illegal argument. f size is not equal n')
  }

  const ret = new Array<number>(2 * n)
  for (let i = 0; i < ret.length; i++) {
    ret[i] = 0
  }

  for (let i = 0; i < n; i++) {

    const fi = f[i]
    for (let j = 0; j < n; j++) {
      ret[i + j] += fi * g[j]
    }
  }

  return ret;
}
