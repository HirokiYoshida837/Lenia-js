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

  // kernelとの畳み込み結果
  const calculatedValue = naiveCyclicConv2d(field, kernel, n);

  // フィールドをコピー
  const nextGen = Enumerable.from(field)
    .select(x => Enumerable.from(x).select(x => x).toArray())
    .toArray()

  // 計算結果から、次の世代を計算。
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const diff = growth(calculatedValue[i][j])
      nextGen[i][j] = constraint(nextGen[i][j] + diff, 0, 1)
    }
  }

  return nextGen
}

// 成長関数
const growth = (u: number): number => {
  return 0 + (u === 3 ? 1 : 0) - ((u < 2) || (u > 3) ? 1 : 0);
}

const constraint = (u: number, min: number, max: number): number => {
  return Math.min(Math.max(u, min), max);
}
