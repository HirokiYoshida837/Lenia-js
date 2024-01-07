'use client'

import {NextPage} from 'next';
import p5Types from 'p5'
import {Sketch} from "@p5-wrapper/react";
import {SketchContainer} from "@/components/sketch-container";
import {fft2d} from "@/lib/algorithm/fft/fft/fft2d/fft-2d";
import {Complex, ComplexGetPowSq} from "@/lib/algorithm/fft/common/complex";

const canvasSize = {
  x: 512,
  y: 512,
};


const Page: NextPage = () => {
  const sketch: Sketch = (p5: p5Types) => {

    let image: p5Types.Image
    let freqDomainData: Complex[][]

    let count = 0;

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

      image.loadPixels();
      image.resize(512, 512)
      p5.pixelDensity(1);

      p5.frameRate(15)
      // p5.noLoop()


      // setup時にfftまで実施する。
      const fftInput: number[][] = new Array(image.width).fill([]).map(() => new Array(image.width).fill(0).map(x => 0))
      for (let i = 0; i < 512; i++) {
        for (let j = 0; j < 512; j++) {

          const p = image.get(i, j)
          const avg = (p[0] + p[1] + p[2]) / 3;

          fftInput[i][j] = avg / 255

        }
      }

      freqDomainData = fft2d(512, fftInput.map(x => x.map(x => {
        return {real: x, imag: 0}
      })), false)

      // freqDomainData = kernelExpandAndShiftComplex(freqDomainImage, 512)
    }

    p5.draw = () => {

      p5.background(0);
      console.log(`count`, count)

      // フレーム数に応じた部分だけ取得
      const drawData = new Array(image.width).fill([]).map(() => new Array(image.width).fill(0).map(x => {
        return {real: 0, imag: 0}
      }))
      for (let index = 0; index < count; index++) {
        const i = Math.floor(index / 512);
        const j = index % 512;
        drawData[i][j] = freqDomainData[i][j];
      }

      const inverted = fft2d(512, drawData, true)

      for (let i = 0; i < 512; i++) {
        for (let j = 0; j < 512; j++) {
          const value = inverted[i][j]
          const v = Math.sqrt(ComplexGetPowSq(value))
          p5.stroke(v * 255)
          p5.point(i, j)
        }
      }

      count+=512
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
