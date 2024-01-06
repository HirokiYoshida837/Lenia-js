'use client'

import {NextPage} from 'next';
import p5Types from 'p5'
import {Sketch} from "@p5-wrapper/react";
import {SketchContainer} from "@/components/sketch-container";
import {GameOfLifeCalculator} from "@/lib/gol/game-of-life/logic";

const canvasSize = {
  x: 500,
  y: 500,
};


const Page: NextPage = () => {
  const sketch: Sketch = (p5: p5Types) => {

    const calculator = new GameOfLifeCalculator(8);

    let field = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]

    p5.setup = () => {
      p5.createCanvas(canvasSize.x, canvasSize.y)
      p5.frameRate(6)
    }

    p5.draw = () => {

      drawCanvas(p5, field)
      field = calculator.calcNextGen(field);
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

  const rectWidth = canvasSize.x / 10;
  const rectHeight = canvasSize.y / 10;

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
