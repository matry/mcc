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
    map[id] = component.elements.map((element, index) => {
      if (index === 0) {
        return {
          ...element.styles.root,
          top: 0,
          left: 0,
          root: true,
        }
      }

      return element.styles.root
    })

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
