import React, { useEffect } from 'react'
import { css } from 'emotion'
import { useCanvas } from '../hooks'

const Canvas = ({ gridOptions, renderer }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  useEffect(() => {
    if (context) {
      renderer.render(context, width, height)
    }
  }, [context])

  return (
    <div ref={resizeRef} style={{ width: '100%', height: '100%' }}>
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
