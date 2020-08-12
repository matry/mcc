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

const App = () => {
  const [activeId, setActiveId] = useState(null)

  const mocks = window.bundle.groupBy('states', 'mock')

  useEffect(() => {
    const url = new URL(window.location.href)
    const detectedActiveId = url.searchParams.get('frame') || mocks[0].states[0].id
    App.setUrlState(detectedActiveId)
    setActiveId(detectedActiveId)

    window.onpopstate = () => {
      const url = new URL(window.location.href)
      const newActiveId = url.searchParams.get('id')
      if (newActiveId) {
        setActiveId(newActiveId)
      }
    }
  }, [])

  if (!activeId) {
    return null
  }

  return (
    <AppContainer>
      <AppHeader>Matry | mvp</AppHeader>
      <AppBody>
        <StoryMenu
          activeId={activeId}
          mocks={mocks}
          onSelect={(newActiveId) => {
            App.setUrlState(newActiveId)
            setActiveId(newActiveId)
          }}
        />

        <Canvas
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

App.setUrlState = (activeId) => {
  const url = new URL(window.location.href)
  url.searchParams.set('id', activeId)
  window.history.pushState('', '', url)
}

export default App
