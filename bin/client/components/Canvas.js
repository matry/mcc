import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { useCanvas } from '../hooks'
import { paintGrid } from '../services/canvas/grid'
import painter from '../services/painter'

const StyledDiv = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
`

const StyledCanvasDiv = styled.div``

const CanvasHeaderDiv = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid #aaa;
`

const Canvas = ({ gridOptions, bundle, component }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  useEffect(() => {
    if (context) {
      paintGrid({ ctx: context, width, height, gridOptions })
      // painter.render(context, width, height, bundle, component)

      context.fillStyle = 'red'
      context.rect(width / 2 - 100, height / 2 - 100, 200, 200)
      context.fill()
    }
  }, [width, height])

  return (
    <StyledDiv ref={resizeRef}>
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
