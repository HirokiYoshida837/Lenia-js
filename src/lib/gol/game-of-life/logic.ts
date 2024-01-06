import Enumerable from "linq";
import {naiveCyclicConv2d} from "@/lib/algorithm/convolution/conv2d/naive-conv-2d";
import {constraint, kernelExpandAndShift} from "@/lib/gol/common/utils";
import {kernel4x4} from "@/lib/gol/game-of-life/constants";
import {GoLCalculator} from "@/lib/gol/common/type";

export class GameOfLifeCalculator implements GoLCalculator {

  n: number
  shiftedKernel: number [][]

  constructor(n: number) {
    this.n = n;
    this.shiftedKernel = kernelExpandAndShift(kernel4x4, n)
  }

  calcNextGen(field: number[][]): number[][] {

    // kernelとの畳み込み結果
    const calculatedValue = naiveCyclicConv2d(field, this.shiftedKernel, this.n);

    // フィールドをコピー
    const nextGen = Enumerable.from(field)
      .select(x => Enumerable.from(x).select(x => x).toArray())
      .toArray()

    // 計算結果から、次の世代を計算。
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        const diff = growth(calculatedValue[i][j])
        nextGen[i][j] = constraint(nextGen[i][j] + diff, 0, 1)
      }
    }

    return nextGen
  }

}

// 成長関数
const growth = (u: number): number => {
  return 0 + (u === 3 ? 1 : 0) - ((u < 2) || (u > 3) ? 1 : 0);
}
