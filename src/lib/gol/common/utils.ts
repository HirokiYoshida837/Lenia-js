import Enumerable from "linq";

/**
 * 畳み込み計算のために、kernelのサイズを拡張し、中心をshiftする。
 * @param originalKernel 元のカーネル
 * @param n 拡張先のサイズ
 */
export const kernelExpandAndShift = (originalKernel: number[][], n: number) => {

  // kernel を nのサイズに拡張する
  const kernel = Enumerable.range(0, n)
    .select(x => Enumerable.range(0, n).select(x => 0).toArray())
    .toArray()

  // TODO : add assertion for kernel is square matrix
  const originalKernelSize = originalKernel.length;

  for (let i = 0; i < originalKernelSize; i++) {
    for (let j = 0; j < originalKernelSize; j++) {

      const di = Math.ceil(i - originalKernelSize / 2)
      const dj = Math.ceil(j - originalKernelSize / 2)

      // 中心をシフトする
      // https://wonderhorn.net/programming/negativeremainder.html
      // ((dividend % divisor) + divisor) % divisor;
      // console.log(`(i,j):`, {i, j}, `,\t (di,dj):`, {di, dj})
      const ti = ((di % n) + n) % n
      const tj = ((dj % n) + n) % n

      // console.log(`ti: ${ti}, tj: ${tj}`)
      kernel[ti][tj] = originalKernel[i][j]
    }
  }

  return kernel
}


/**
 * constrains returns a number between minimum and maximum value.
 * @param u
 * @param min
 * @param max
 */
export const constraint = (u: number, min: number, max: number): number => {
  return Math.min(Math.max(u, min), max);
}
