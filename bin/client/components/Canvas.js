import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import { useCanvas } from '../hooks'
import { renderFragments } from '../services/canvas'

const Canvas = ({ gridOptions, fragments }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  if (context) {
    renderFragments(context, width, height, gridOptions, fragments)
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
  fragments: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.oneOf(['group', 'shape', 'text']),
      parent: PropTypes.string,
      styles: PropTypes.object,
    })
  ),
}

Canvas.defaultProps = {
  fragments: [],
}

export default Canvas
