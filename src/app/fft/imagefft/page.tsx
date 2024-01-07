'use client'

import {NextPage} from 'next';
import p5Types from 'p5'
import {Sketch} from "@p5-wrapper/react";
import {SketchContainer} from "@/components/sketch-container";
import {GameOfLifeCalculator} from "@/lib/gol/game-of-life/logic";
import {fft2d} from "@/lib/algorithm/fft/fft/fft2d/fft-2d";
import {ComplexGetPowSq} from "@/lib/algorithm/fft/common/complex";
import {kernelExpandAndShiftComplex} from "@/lib/gol/common/utils";

const canvasSize = {
  x: 512 * 3,
  y: 512,
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

    let image: p5Types.Image

    p5.preload = () => {
      image = p5.loadImage('/resources/Schmitt_moonwalk.jpg',
        p1 => {
          console.info(`loading image success`)
          console.log(`width`, p1.width)
        },
        p1 => {
          console.error(p1)
          alert(`loading image failed`)
        }
      )
    }

    p5.setup = () => {
      p5.createCanvas(canvasSize.x, canvasSize.y)
      p5.noLoop()

      image.loadPixels();

      p5.pixelDensity(1);
      // p5.frameRate(6)
    }

    p5.draw = () => {

      image.resize(512, 512)
      // p5.image(image, 0, 0)

      const fftInput: number[][] = new Array(image.width).fill([]).map(() => new Array(image.width).fill(0).map(x => 0))
      for (let i = 0; i < 512; i++) {
        for (let j = 0; j < 512; j++) {

          const p = image.get(i, j)
          const avg = (p[0] + p[1] + p[2]) / 3;

          fftInput[i][j] = avg / 255

        }
      }

      // console.log(fftInput)


      for (let i = 0; i < 512; i++) {
        for (let j = 0; j < 512; j++) {
          p5.stroke(fftInput[i][j] * 255)
          p5.point(i, j)
        }
      }


      const freqDomainImage = fft2d(512, fftInput.map(x => x.map(x => {
        return {real: x, imag: 0}
      })), false)
      const shifted = kernelExpandAndShiftComplex(freqDomainImage, 512)


      // 中心周りを0にする。
      for (let i = 0; i < 256; i++) {
        for (let j = 0; j < 256; j++) {

          const di = i - 256 / 2
          const dj = j - 256 / 2

          const x = 512 / 2 + di
          const y = 512 / 2 + dj

          shifted[x][y] = {real: 0, imag: 0}
        }
      }

      for (let i = 0; i < 512; i++) {
        for (let j = 0; j < 512; j++) {
          const v = shifted[i][j]
          p5.stroke(Math.sqrt(ComplexGetPowSq(v)))
          p5.point(512 + i, j)
        }
      }


      const inverted = fft2d(512, shifted, true);
      for (let i = 0; i < 512; i++) {
        for (let j = 0; j < 512; j++) {
          const value = inverted[i][j]
          const v = Math.sqrt(ComplexGetPowSq(value))
          p5.stroke(v * 255)
          p5.point(512 + 512 + i, j)
        }
      }
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

  p5.push()
  p5.rectMode("center")
  p5.pop()
}


export default Page;
