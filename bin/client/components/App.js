import React from 'react'
import styled from '@emotion/styled'
import AppHeader from './AppHeader'
import ComponentViewer from './ComponentViewer'

const AppMain = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: max-content auto;
`

const App = ({ bundle }) => {
  const name = bundle.components.list[1]

  return (
    <AppMain>
      <AppHeader onToggleNav={() => {}} />
      <ComponentViewer bundle={bundle} name={name} />
    </AppMain>
  )
}

export default App
