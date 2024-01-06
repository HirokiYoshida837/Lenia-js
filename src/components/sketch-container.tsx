'use client'

import {NextReactP5Wrapper} from '@p5-wrapper/next';
import React from "react";
import {type Sketch} from "@p5-wrapper/react";

type Props = {
  sketch: Sketch
}

export const SketchContainer: React.FC<Props> = (props: Props) => {

  return (
    <NextReactP5Wrapper sketch={props.sketch}/>
  )
}
