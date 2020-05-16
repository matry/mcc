import React from 'react'
import { css } from 'emotion'
import { useCanvas } from '../hooks'
import { render } from '../services/webrender'

const Canvas = ({ gridOptions, componentName, bundle }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  if (context) {
    const renderer = render(context, bundle, componentName, width, height)
  }

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
