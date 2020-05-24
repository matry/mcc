import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from 'emotion'
import { useCanvas } from '../hooks'
import { paintGrid } from '../services/canvas/grid'
import renderShape from '../services/new/renderShape'
import renderText from '../services/new/renderText'

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

const render = (ctx, nodes) => {
  nodes.forEach((node) => {
    switch (node.type) {
      case 'text':
        renderText(ctx, node)
        break
      case 'shape':
        renderShape(ctx, node)
        break
      default:
        break
    }
  })
}

const Canvas = ({ gridOptions, nodes }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  useEffect(() => {
    if (context) {
      paintGrid({ ctx: context, width, height, gridOptions })
      render(context, nodes)
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
