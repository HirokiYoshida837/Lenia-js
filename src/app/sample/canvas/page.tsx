'use client'

import {NextPage} from 'next';
import {useEffect, useRef} from "react";
import {number} from "prop-types";


const Page: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestIdRef = useRef(0);
  const ballRef = useRef({x: 50, y: 50, vx: 3.9, vy: 3.3, radius: 20});
  const size = {width: 400, height: 250};

  const updateBall = () => {
    const ball = ballRef.current;
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x + ball.radius >= size.width) {
      ball.vx = -ball.vx;
      ball.x = size.width - ball.radius;
    }
    if (ball.x - ball.radius <= 0) {
      ball.vx = -ball.vx;
      ball.x = ball.radius;
    }
    if (ball.y + ball.radius >= size.height) {
      ball.vy = -ball.vy;
      ball.y = size.height - ball.radius;
    }
    if (ball.y - ball.radius <= 0) {
      ball.vy = -ball.vy;
      ball.y = ball.radius;
    }
  };


  const renderFrame = () => {
    const ctx = canvasRef.current?.getContext("2d")
    updateBall();

    if(ctx){
      ctx.clearRect(0,0, 800, 800)

      ctx.save()
      ctx.beginPath()
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
      ctx.fillStyle = "#444"
      ctx.fill()

      ctx.closePath()

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
      <canvas ref={canvasRef} width={800} height={800}/>
    </>
  )
}

export default Page;
