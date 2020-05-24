import React from 'react'
import styled from '@emotion/styled'
import AppHeader from './AppHeader'
import ComponentViewer from './ComponentViewer'

const AppMain = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: max-content auto;
`

const App = () => {
  return (
    <AppMain>
      <AppHeader onToggleNav={() => {}} />
      <ComponentViewer name="Demo" />
    </AppMain>
  )
}

export default App
