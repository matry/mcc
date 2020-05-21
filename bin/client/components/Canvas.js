import React, { useEffect } from 'react'
import { css } from 'emotion'
import { useCanvas } from '../hooks'
import { paintGrid } from '../services/canvas/grid'

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
    <div ref={resizeRef} style={{ overflow: 'hidden', maxHeight: '100%' }}>
      <canvas
        ref={canvasRef}
        className={css`
          width: 100%;
          height: 100%;
          background-color: transparent;
        `}
      ></canvas>
    </div>
  )
}

export default Canvas
