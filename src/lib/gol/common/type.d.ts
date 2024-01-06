/**
 * game of life 計算を実行する。
 *
 */
export interface GoLCalculator {
  /**
   * 事前に計算してあるカーネルの値を利用して、次の世代を計算する。
   * @param field
   */
  calcNextGen(field: number[][]): number[][]
}


export type SquareMatrix = {
  size: number;
  value: number[][]
}


