import Enumerable from "linq";
import {bellCurve, initialKernel} from "@/lib/gol/lenia/constants";
import {naiveCyclicConv2d} from "@/lib/algorithm/convolution/conv2d/naive-conv-2d";

// const kernel4x4: readonly number[][] = [
//   [0, 0, 0, 0],
//   [0, 1, 1, 1],
//   [0, 1, 0, 1],
//   [0, 1, 1, 1],
// ]

const kernel27x27 = initialKernel

//         const convolved = convolution(stateA, props.kernel.kernelMatrix, 'wrap');
//         // console.debug(`convolved`, convolved)
//
//         // 畳み込みの計算結果から、各セルが次のフレームでどうなっているかを計算。
//         const diff = convolved.map(x => x.map(y => growth(y)))
//             .map(x => x.map(y => y / T));
//         // console.log(`diff`, diff)
//
//
//         // update
//         for (let i = 0; i < props.canvasInfo.gridSize.h; i++) {
//             for (let j = 0; j < props.canvasInfo.gridSize.w; j++) {
//
//                 const value = diff[i][j];
//                 stateA[i][j] = p5.constrain(stateA[i][j] + value, 0, 1);
//             }
//         }


export const calcNextGen = (field: number[][], n: number): number[][] => {


  // kernel を nのサイズに拡張する
  const kernel = Enumerable.range(0, n)
    .select(x => Enumerable.range(0, n).select(x => 0).toArray())
    .toArray()

  for (let i = 0; i < 27; i++) {
    for (let j = 0; j < 27; j++) {

      const di = Math.ceil(i - 27 / 2)
      const dj = Math.ceil(j - 27 / 2)

      // 中心をシフトする
      // https://wonderhorn.net/programming/negativeremainder.html
      // ((dividend % divisor) + divisor) % divisor;
      console.log(`(i,j):`, {i, j}, `,\t (di,dj):`, {di, dj})
      const ti = ((di % n) + n) % n
      const tj = ((dj % n) + n) % n

      // console.log(`ti: ${ti}, tj: ${tj}`)
      kernel[ti][tj] = kernel27x27[i][j]
    }
  }

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
