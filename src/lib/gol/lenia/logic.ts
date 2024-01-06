import Enumerable from "linq";
import {bellCurve, initialKernel} from "@/lib/gol/lenia/constants";
import {naiveCyclicConv2d} from "@/lib/algorithm/convolution/conv2d/naive-conv-2d";

export class LeniaCalculator {

  kernel: number[][]
  m: number
  s: number
  n: number

  shiftedKernel: number[][];
  growthFunc: (u: number) => number

  constructor(kernel: number[][], m: number, s: number, n: number) {
    this.kernel = kernel
    this.m = m;
    this.s = s;
    this.n = n;

    this.shiftedKernel = kernelExpandAndShift(kernel, n)
    this.growthFunc = createGrowthFunc(m, s)

  }

  public calcNextGen(field: number[][]): number[][] {

    // kernelとの畳み込み結果
    const calculatedValue = naiveCyclicConv2d(field, this.shiftedKernel, this.n);

    // フィールドをコピー
    const nextGen = Enumerable.from(field)
      .select(x => Enumerable.from(x).select(x => x).toArray())
      .toArray()

    // 計算結果から、次の世代を計算。
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        const diff = this.growthFunc(calculatedValue[i][j]) / 5

        nextGen[i][j] = constraint(nextGen[i][j] + diff, 0, 1)
      }
    }

    return nextGen
  }


}


const kernel27x27 = initialKernel


const kernelExpandAndShift = (originalKernel: number[][], n: number) => {

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
      kernel[ti][tj] = kernel27x27[i][j]
    }
  }

  return kernel
}


export const calcNextGen = (field: number[][], n: number): number[][] => {


  // kernel を nのサイズに拡張する
  const kernel = kernelExpandAndShift(kernel27x27, n);

  //             growthM: 0.15,
  //             growthS: 0.0185,

  const growth = createGrowthFunc(0.15, 0.0185)

  // kernelとの畳み込み結果
  const calculatedValue = naiveCyclicConv2d(field, kernel, n);


  // フィールドをコピー
  const nextGen = Enumerable.from(field)
    .select(x => Enumerable.from(x).select(x => x).toArray())
    .toArray()

  // 計算結果から、次の世代を計算。
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const diff = growth(calculatedValue[i][j]) / 5

      nextGen[i][j] = constraint(nextGen[i][j] + diff, 0, 1)
    }
  }

  return nextGen
}


const createGrowthFunc = (m: number, s: number) => {
  return (u: number) => {
    return (bellCurve(u, m, s) * 2) - 1;
  }
}

const constraint = (u: number, min: number, max: number): number => {
  return Math.min(Math.max(u, min), max);
}
