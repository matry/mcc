import React, { useState } from 'react'
import styled from '@emotion/styled'
import AppHeader from './AppHeader'
import AppNav from './AppNav'
import Viewer from './Viewer'

const AppMain = styled.main`
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: max-content auto;
`

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
`

const App = ({ bundle }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isGridOptionsOpen, setIsGridOptionsOpen] = useState(false)
  const [selectedTitle, setselectedTitle] = useState('Button')

  const navTitles = {
    Tokens: Object.keys(bundle.tokens),
    Components: Object.keys(bundle.components),
  }

  let selectedEntity = null
  if (bundle.tokens[selectedTitle]) {
    selectedEntity = bundle.tokens[selectedTitle]
  } else {
    selectedEntity = bundle.components[selectedTitle]
  }

  let type = null
  if (navTitles.Tokens.includes(selectedTitle)) {
    type = 'tokens'
  } else if (navTitles.Components.includes(selectedTitle)) {
    type = 'component'
  }

  return (
    <AppMain>
      <AppHeader
        onToggleNav={() => setIsNavOpen(!isNavOpen)}
        onToggleGrid={() => setIsGridOptionsOpen(!isGridOptionsOpen)}
      />
      <GridDiv>
        <AppNav
          selectedTitle={selectedTitle}
          navTitles={navTitles}
          onSelect={setselectedTitle}
          isOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
        />
        <Viewer name={selectedTitle} type={type} entity={selectedEntity} />
      </GridDiv>
    </AppMain>
  )
}

export default App
