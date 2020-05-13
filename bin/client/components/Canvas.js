import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { useCanvas } from '../hooks'
import { render } from '../services/webrender'

const Canvas = ({ gridOptions, bundle }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  if (context) {
    const renderer = render(context, bundle, width, height)
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

Canvas.propTypes = {
  bundle: PropTypes.object,
}

Canvas.defaultProps = {
  fragments: [],
  bundle: {},
}

export default Canvas
