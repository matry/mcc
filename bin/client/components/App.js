import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { spacing, colors } from '../theme'
import Canvas from './Canvas'
import StoryMenu from './StoryMenu'

const AppContainer = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: max-content auto;
`

const AppHeader = styled.header`
  padding: ${spacing(1.5)}px;
  background: linear-gradient(45deg, ${colors.lightBlue[500]} 30%, ${colors.cyan[300]} 90%);
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
`

const AppBody = styled.section`
  display: grid;
  grid-template-columns: max-content 1fr;
  overflow: hidden;
`

const App = ({ bundle }) => {
  const map = {}

  const list = bundle.map((component) => {
    const id = `${component.name}_default`
    map[id] = []

    return {
      id: component.name,
      name: component.name,
      frames: [
        {
          id,
          name: 'Default',
        },
      ],
    }
  })

  const stories = [
    {
      id: 'block',
      name: 'Block',
      frames: [
        {
          id: 'block_small',
          name: 'Small',
        },
        {
          id: 'block_medium',
          name: 'Medium',
        },
        {
          id: 'block_large',
          name: 'Large',
        },
      ],
    },
    {
      id: 'button',
      name: 'Button',
      frames: [
        {
          id: 'button_default',
          name: 'Default',
        },
        {
          id: 'button_hovered',
          name: 'Hovered',
        },
        {
          id: 'button_focused',
          name: 'Focused',
        },
      ],
    },
  ]

  const nodeMap = {
    block_small: [
      {
        type: 'shape',
        top: 0,
        left: 0,
        width: 50,
        height: 50,
        fill: '#202020',
        strokeWidth: 0,
        strokeColor: '#000000',
        cornerRadius: 0,
      },
    ],
    block_medium: [
      {
        type: 'shape',
        top: 0,
        left: 0,
        width: 150,
        height: 150,
        fill: '#202020',
        strokeWidth: 0,
        strokeColor: '#000000',
        cornerRadius: 0,
      },
    ],
    block_large: [
      {
        type: 'shape',
        top: 0,
        left: 0,
        width: 350,
        height: 350,
        fill: '#202020',
        strokeWidth: 0,
        strokeColor: '#000000',
        cornerRadius: 0,
      },
    ],
    button_default: [
      {
        type: 'shape',
        top: 0,
        left: 0,
        width: 180,
        height: 42,
        fill: '#007BFF',
        strokeWidth: 2,
        strokeColor: '#007BFF',
        cornerRadius: 5,
      },
      {
        type: 'text',
        content: 'Click Me',
        top: 0,
        left: 0,
        width: 180,
        height: 32,
        fontSize: 18,
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
        fill: '#FFFFFF',
        textHeight: 32,
        textAlignX: 'center',
        textAlignY: 'center',
      },
    ],
    button_hovered: [
      {
        type: 'shape',
        top: 0,
        left: 0,
        width: 180,
        height: 42,
        fill: '#0058AA',
        strokeWidth: 2,
        strokeColor: '#0058AA',
        cornerRadius: 5,
      },
      {
        type: 'text',
        content: 'Click Me',
        top: 0,
        left: 0,
        width: 180,
        height: 32,
        fontSize: 18,
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
        fill: '#FFFFFF',
        textHeight: 32,
        textAlignX: 'center',
        textAlignY: 'center',
      },
    ],
    button_focused: [
      {
        type: 'shape',
        top: 0,
        left: 0,
        width: 180,
        height: 42,
        fill: '#007BFF',
        strokeWidth: 2,
        strokeColor: '#003588',
        cornerRadius: 5,
      },
      {
        type: 'text',
        content: 'Click Me',
        top: 0,
        left: 0,
        width: 180,
        height: 32,
        fontSize: 18,
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
        fill: '#FFFFFF',
        textHeight: 32,
        textAlignX: 'center',
        textAlignY: 'center',
      },
    ],
  }

  const [frameId, setFrameId] = useState(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    const detectedFrameId = url.searchParams.get('frame') || list[0].frames[0].id
    App.setUrlState(detectedFrameId)
    setFrameId(detectedFrameId)

    window.onpopstate = () => {
      const url = new URL(window.location.href)
      const newFrameId = url.searchParams.get('frame')
      if (newFrameId) {
        setFrameId(newFrameId)
      }
    }
  }, [])

  if (!frameId) {
    return null
  }

  return (
    <AppContainer>
      <AppHeader>Matry | mvp</AppHeader>
      <AppBody>
        <StoryMenu
          activeFrameId={frameId}
          stories={list}
          onSelect={(newFrameId) => {
            App.setUrlState(newFrameId)
            setFrameId(newFrameId)
          }}
        />

        <Canvas
          bundle={bundle}
          gridOptions={{
            gridColor: '#ddd',
            gridPlacement: 'back',
            gridSpacing: 10,
            gridLineWidth: 0.5,
          }}
          nodes={map[frameId]}
          nodeId={frameId}
        />
      </AppBody>
    </AppContainer>
  )
}

App.setUrlState = (frameId) => {
  const url = new URL(window.location.href)
  url.searchParams.set('frame', frameId)
  window.history.pushState('', '', url)
}

export default App
