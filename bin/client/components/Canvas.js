import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { useCanvas } from '../hooks'
import { paintGrid } from '../services/canvas/grid'

const StyledDiv = styled.div`
  max-height: 100%;
  overflow: hidden;
  position: relative;
`

const CanvasHeaderDiv = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid #aaa;
`

const Canvas = ({ gridOptions, renderer }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, width, height)
      paintGrid({ ctx: context, width, height, gridOptions })
      renderer.render(context, width, height)
    }
  }, [width, height])

  return (
    <StyledDiv ref={resizeRef}>
      <CanvasHeaderDiv></CanvasHeaderDiv>
      <canvas
        ref={canvasRef}
        className={css`
          width: 100%;
          height: 100%;
          background-color: transparent;
        `}
      ></canvas>
    </StyledDiv>
  )
}

export default Canvas
