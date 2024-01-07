'use client'

import {NextPage} from 'next';
import {useEffect, useRef} from "react";
import Enumerable from "linq";
import {initialFieldLenia, initialKernel} from "@/lib/gol/lenia/constants";
import {LeniaCalculatorByFFT} from "@/lib/gol/lenia/logic";

const size = 128;
const gridSize = 8;

const canvasSize = {
  // 1マス 8px x 64マス
  x: gridSize * size,
  y: gridSize * size,
};

const Page: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef(0);

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

  const updateLenia = () => {
    leniaCalculator.calcNextGen(field)
  };


  const renderFrame = () => {
    const ctx = canvasRef.current?.getContext("2d", {alpha: false,})
    updateLenia()

    if (ctx) {
      ctx.fillStyle = 'black';
      ctx.clearRect(0, 0, canvasSize.x, canvasSize.y)
      ctx.save()
      {
        for (let i = 0; i < field.length; i++) {
          for (let j = 0; j < field[i].length; j++) {

            const v = field[i][j];
            const v1 = (v * 80 + 240);
            ctx.fillStyle = `hsl(${v1},80%,50%)`;
            ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
          }
        }
      }
      ctx.restore()
    }
  };

  const tick = () => {
    if (!canvasRef.current) return;
    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  return (
    <>
      <center>
        <canvas ref={canvasRef} width={canvasSize.x} height={canvasSize.y}/>
      </center>
    </>
  )
}

export default Page;
