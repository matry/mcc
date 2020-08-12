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

const Canvas = ({ gridOptions }) => {
  const { context, width, height, canvasRef, resizeRef } = useCanvas()

  const nodes = [
    {
      type: 'shape',
      root: true,
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      fill: '#007BFF',
      clip: false,
    },
    {
      type: 'shape',
      root: false,
      top: 80,
      left: 80,
      width: 20,
      height: 20,
      fill: '#FFAA55',
      clip: false,
    },
    {
      type: 'text',
      root: false,
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      content: 'Click Me',
      fill: '#020202',
      textAlignX: 'center',
      textAlignY: 'bottom',
      textHeight: 100,
      clip: false,
    },
  ]

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, width, height)
      paintGrid({ ctx: context, width, height, gridOptions })
      painter.render(context, width, height, nodes)
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

/*

LOAD
1. get selected state
2. get component from input
3. get elements from component
4. build staging for component
  for each element
    if element is component, recurse on step 4
    add render values to render map
    get styles by element
    for each style
      add expression to expression map

RENDER
1. set render map to empty
2. pull contextual info (width, height, tokens, parameters)
3. for each expression
  calculate values from expression
4. if render map not complete, repeat step 1
5. from render map, build list of render nodes

...

list of render_nodes with canvas properties for drawing to screen

*/
