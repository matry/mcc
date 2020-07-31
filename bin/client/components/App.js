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
  const stories = [
    {
      id: 'block',
      name: 'Block',
      frames: [
        {
          id: 'block_default',
          name: 'Default',
        },
        {
          id: 'block_highlighted',
          name: 'Highlighted',
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

  const [frameId, setFrameId] = useState(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    const detectedFrameId = url.searchParams.get('frame') || stories[0].frames[0].id
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
          stories={stories}
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
