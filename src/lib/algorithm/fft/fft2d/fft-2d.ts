import {Complex} from "@/lib/algorithm/fft/common/complex";
import {fft1d} from "@/lib/algorithm/fft/fft1d/fft-1d";


export function fft2d(sz: number, a: Complex[][], inv = false): Complex[][] {

  if (inv) {
    /**
     * フーリエ逆変換を行う
     */

      // 列方向の逆FFTをする。(操作しやすいように、転置して逆変換して転置する）
    const irIn = transposeMatrix(transposeMatrix(a).map(x => fft1d(sz, x, true)))

    // 行方向の逆FFTをする
    const rowIFFT = irIn.map(x => fft1d(sz, x, true));

    return rowIFFT

  } else {
    /**
     * フーリエ変換を行う
     */

      // 行方向のFFTをする
    const rowFFT = a.map(x => fft1d(sz, x, false));

    // 列方向のFFTをする(FFTしやすいように転置して、そのあとに戻す)
    const ret = transposeMatrix(transposeMatrix(rowFFT).map(x => fft1d(sz, x, false)));

    return ret;
  }

}

/**
 * 正方行列を転置する
 * @param input
 */
function transposeMatrix<T>(input: Array<Array<T>>): Array<Array<T>> {

  const n = input.length;

  const ret: Array<Array<T>> = new Array(n).fill([]).map(() => new Array(n).fill(null))

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      ret[j][i] = input[i][j]
    }
  }

  return ret;
}
