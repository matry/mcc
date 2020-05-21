import React from 'react'
import styled from '@emotion/styled'
import AppHeader from './AppHeader'
import ComponentViewer from './ComponentViewer'

const AppMain = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: max-content auto;
  position: relative;
`

const App = ({ renderer }) => {
  renderer.selectComponent('Squares')

  return (
    <AppMain>
      <AppHeader onToggleNav={() => {}} />
      <ComponentViewer renderer={renderer} name={renderer.component.title} />
    </AppMain>
  )
}

export default App
