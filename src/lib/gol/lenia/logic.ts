import Enumerable from "linq";
import {bellCurve} from "@/lib/gol/lenia/constants";
import {naiveCyclicConv2d} from "@/lib/algorithm/convolution/conv2d/naive-conv-2d";
import {constraint, kernelExpand, kernelExpandAndShift} from "@/lib/gol/common/utils";
import {GoLCalculator} from "@/lib/gol/common/type";
import {fftCyclicConv2dByGivenFreqDomainKernel} from "@/lib/algorithm/convolution/conv2d/fft-conv-2d";
import {Complex} from "@/lib/algorithm/fft/common/complex";
import {fft2d} from "@/lib/algorithm/fft/fft/fft2d/fft-2d";

/**
 * ナイーブ畳み込みによるLeniaの実装
 */
export class LeniaCalculator implements GoLCalculator {

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

    // コンストラクタ内で前準備を行う。
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

/**
 * FFTによる畳み込みを利用したLeniaの実装
 * <br/>
 * 処理が重たくあまりフレームレートがでない
 */
export class LeniaCalculatorByFFT implements GoLCalculator {

  kernel: number[][]
  m: number
  s: number
  n: number

  shiftedKernel: number[][];
  // 事前に周波数領域に変換したカーネル
  freqDomainKernel: Complex[][];
  growthFunc: (u: number) => number

  constructor(kernel: number[][], m: number, s: number, n: number) {
    this.kernel = kernel
    this.m = m;
    this.s = s;
    this.n = n;

    // コンストラクタ内で前準備を行う。
    this.shiftedKernel = kernelExpandAndShift(kernel, n)
    // this.shiftedKernel = kernelExpand(kernel, n)

    const complex = Enumerable.from(this.shiftedKernel).select(x => Enumerable.from(x).select(x => {return {real:x, imag:0}}).toArray()).toArray();
    this.freqDomainKernel = fft2d(n, complex, false);

    this.growthFunc = createGrowthFunc(m, s)
  }

  public calcNextGen(field: number[][]) {

    // kernelとの畳み込み結果
    const calculatedValue = fftCyclicConv2dByGivenFreqDomainKernel(field, this.freqDomainKernel, this.n);

    // 計算結果から、次の世代を計算。
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        const diff = this.growthFunc(calculatedValue[i][j]) / 5
        field[i][j] = constraint(field[i][j] + diff, 0, 1)
      }
    }
  }
}


const createGrowthFunc = (m: number, s: number) => {
  return (u: number) => {
    return (bellCurve(u, m, s) * 2) - 1;
  }
}

