'use client'

import {NextPage} from 'next';
import p5Types from 'p5'
import {useRef} from "react";
import {Sketch} from "@p5-wrapper/react";
import Enumerable from "linq";
import {initialFieldLenia, initialKernel} from "@/lib/gol/lenia/constants";
import {LeniaCalculatorByFFT} from "@/lib/gol/lenia/logic";
import {SketchContainer} from "@/components/sketch-container";

const size = 128;
const gridSize = 8;

const canvasSize = {
  // 1マス 8px x 64マス
  x: gridSize * size,
  y: gridSize * size,
};

const rectWidth = canvasSize.x / size;
const rectHeight = canvasSize.y / size;

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

    const kernel27x27 = initialKernel

    const leniaCalculator = new LeniaCalculatorByFFT(kernel27x27, 0.15, 0.0191, size);
    // const leniaCalculator = new LeniaCalculator(kernel27x27, 0.15, 0.0185, 64);

    let loopCount = 0;

    p5.setup = () => {
      // https://himco.jp/2020/04/12/p5-js%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E6%9C%80%E9%81%A9%E5%8C%96/#FPS_%EF%BC%91%E7%A7%92%E5%BD%93%E3%81%9F%E3%82%8A%E3%81%AE%E3%83%95%E3%83%AC%E3%83%BC%E3%83%A0%E6%95%B0
      p5.disableFriendlyErrors = true; // FESを無効化
      p5.createCanvas(canvasSize.x, canvasSize.y)
      p5.frameRate(30)
      // p5.rectMode("center")
      p5.colorMode('hsb', 100);
    }

    p5.draw = () => {
      p5.scale(gridSize)
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

const drawCanvas = (p5: p5Types, field: number[][]) => {

  p5.background(0);

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {

      const v = field[i][j];
      const v1 = (v * 75 + 60) % 100;
      p5.stroke(v1, 100, 80)
      p5.point(j, i)
    }
  }
}


export default Page;
