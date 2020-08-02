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

const Canvas = ({ nodeId, gridOptions, nodes }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  useEffect(() => {
    if (context) {
      // context.clearRect(0, 0, width, height)
      // paintGrid({ ctx: context, width, height, gridOptions })
      // painter.render(context, width, height, nodes)
    }
  }, [width, height, nodeId])

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
