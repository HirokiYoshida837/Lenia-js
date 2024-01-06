import {describe, expect, it} from "vitest";
import {naiveLinerConv1d} from "@/lib/algorithm/convolution/conv1d/naive-fft-1d";
describe("naiveLinerConv1d", () => {

  it('畳み込みができることのテスト', () => {

    const n = 16;
    const x = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0
    ]
    const h = [
      3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2
    ]
    const expected = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 6,
      3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 0, 0
    ]

    const ret = naiveLinerConv1d(x, h, n)

    console.log(ret)

    expect(ret).toEqual(expected)
  })

});


