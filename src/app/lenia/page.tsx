'use client'

import {NextPage} from 'next';
import p5Types from 'p5'
import {Sketch} from "@p5-wrapper/react";
import {SketchContainer} from "@/components/sketch-container";
import {initialFieldLenia, initialKernel} from "@/lib/gol/lenia/constants";
import Enumerable from "linq";
import {LeniaCalculatorByFFT} from "@/lib/gol/lenia/logic";

const size = 64;

const canvasSize = {
  // 1マス 8px x 64マス
  x: 8 * size,
  y: 8 * size,
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

    const kernel27x27 = initialKernel

    const leniaCalculator = new LeniaCalculatorByFFT(kernel27x27, 0.15, 0.0191, size);
    // const leniaCalculator = new LeniaCalculator(kernel27x27, 0.15, 0.0185, 64);


    p5.setup = () => {
      p5.createCanvas(canvasSize.x, canvasSize.y)
      // p5.frameRate(5)
    }

    p5.draw = () => {
      console.log(p5.frameRate())
      drawCanvas(p5, field)
      field = leniaCalculator.calcNextGen(field)
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

  const rectWidth = canvasSize.x / size;
  const rectHeight = canvasSize.y / size;

  p5.push()
  p5.rectMode("center")

  p5.colorMode('hsb', 100);
  p5.background(0);


  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {

      const v = field[i][j];

      const v1 = (v * 75 + 60) % 100;

      p5.fill(v1, 100, 80)

      const x = j * rectWidth + rectWidth / 2;
      const y = i * rectHeight + rectHeight / 2;
      p5.rect(x, y, rectWidth, rectHeight);

    }
  }
  p5.pop()
}


export default Page;
