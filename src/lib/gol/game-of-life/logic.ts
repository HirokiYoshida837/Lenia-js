import Enumerable from "linq";
import {naiveCyclicConv2d} from "@/lib/algorithm/convolution/conv2d/naive-conv-2d";

const kernel4x4: readonly number[][] = [
  [0, 0, 0, 0],
  [0, 1, 1, 1],
  [0, 1, 0, 1],
  [0, 1, 1, 1],
]

export const calcNextGen = (field: number[][], n: number): number[][] => {

  // kernel を nのサイズに拡張する
  const kernel = Enumerable.range(0, n)
    .select(x => Enumerable.range(0, n).select(x => 0).toArray())
    .toArray()

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {

      const di = i - 4 / 2
      const dj = j - 4 / 2

      // 中心をシフトする
      // https://wonderhorn.net/programming/negativeremainder.html
      // ((dividend % divisor) + divisor) % divisor;
      // console.log(`(i,j):`, {i, j}, `,\t (di,dj):`, {di, dj})
      const ti = ((di % n) + n) % n
      const tj = ((dj % n) + n) % n

      // console.log(`ti: ${ti}, tj: ${tj}`)
      kernel[ti][tj] = kernel4x4[i][j]
    }
  }

  // for (let item of kernel.map(x => x.toString())) {
  //   console.log(item)
  // }

  // kernelとの畳み込み結果
  const calculatedValue = naiveCyclicConv2d(field, kernel, n);

  for (let item of calculatedValue.map(x => x.toString())) {
    console.log(item)
  }

  const nextGen = Enumerable.range(0, n)
    .select(x => Enumerable.range(0, n).select(x => 0).toArray())
    .toArray()

  // 計算結果から、次の世代を計算。
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {

      const v = calculatedValue[i][j];
      if (field[i][j] == 0) {
        if (v == 3) {
          // 誕生ケース
          nextGen[i][j] = 1;
        }
      } else {
        if (2 <= v && v < 4) {
          // 生存ケース
          nextGen[i][j] = 1;
        } else if (v <= 1) {
          // 過疎ケース
          nextGen[i][j] = 0;
        } else if (4 <= v) {
          // 過密ケース
          nextGen[i][j] = 0;
        }
      }
    }
  }


  return nextGen
}
