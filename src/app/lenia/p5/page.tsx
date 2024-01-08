'use client'

import {NextPage} from 'next';
import p5Types from 'p5'
import {Sketch} from "@p5-wrapper/react";
import Enumerable from "linq";
import {initialFieldLenia, initialKernel} from "@/lib/gol/lenia/constants";
import {LeniaCalculatorByFFT} from "@/lib/gol/lenia/logic";
import {SketchContainer} from "@/components/sketch-container";

const size = 256;
const gridSize = 4;

const canvasSize = {
  // 1マス 8px x 64マス
  x: gridSize * size,
  y: gridSize * size,
};

const Page: NextPage = () => {

  const sketch: Sketch = (p5: p5Types) => {

    let field = Enumerable.range(0, size)
      .select(x => Enumerable.range(0, size).select(x => 0).toArray())
      .toArray()

    for (let i = 0; i < initialFieldLenia.length; i++) {
      for (let j = 0; j < initialFieldLenia[i].length; j++) {
        field[i][j] = initialFieldLenia[i][j];
      }
    }

    for (let i = 0; i < initialFieldLenia.length; i++) {
      for (let j = 0; j < initialFieldLenia[i].length; j++) {
        field[j + 20][i + 30] = initialFieldLenia[i][j];
      }
    }

    for (let i = 0; i < initialFieldLenia.length; i++) {
      for (let j = 0; j < initialFieldLenia[i].length; j++) {
        field[j + 40][i + 80] = initialFieldLenia[i][j];
      }
    }


    const kernel27x27 = initialKernel

    const leniaCalculator = new LeniaCalculatorByFFT(kernel27x27, 0.15, 0.0191, size);

    let loopCount = 0;

    p5.setup = () => {
      // https://himco.jp/2020/04/12/p5-js%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E6%9C%80%E9%81%A9%E5%8C%96/#FPS_%EF%BC%91%E7%A7%92%E5%BD%93%E3%81%9F%E3%82%8A%E3%81%AE%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E6%95%B0
      p5.disableFriendlyErrors = true; // FESを無効化
      p5.createCanvas(canvasSize.x, canvasSize.y)

      // p5.noLoop()
      p5.pixelDensity(1)
    }

    p5.draw = () => {
      // console.log(p5.frameRate())

      drawCanvas(p5, field)
      leniaCalculator.calcNextGen(field)
    }
  }

  return (
    <>
      <SketchContainer sketch={sketch}/>
    </>
  );

}

/**
 *
 * @param p5
 * @param field
 */
const drawCanvas = (p5: p5Types, field: number[][]) => {

  p5.background(0);

  p5.loadPixels();

  // 渡されたfieldを描画する
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {

      const v = Math.floor(field[x][y] * 255);

      // グリッド内を同じ色で塗りつぶし
      for (let py = 0; py < gridSize; py++) {
        for (let px = 0; px < gridSize; px++) {

          const fx = (x * gridSize) + px;
          const fy = (y * gridSize) + py;

          const fpos = ((fx % canvasSize.x) + (fy * canvasSize.y)) * 4;

          // R, G, B, A
          [p5.pixels[fpos], p5.pixels[fpos + 1], p5.pixels[fpos + 2], p5.pixels[fpos + 3]] = [v, v, v, 255]
        }
      }

    }
  }

  p5.updatePixels();
}


export default Page;
