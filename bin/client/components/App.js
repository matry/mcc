import React, { useState } from 'react'
import styled from '@emotion/styled'
import AppHeader from './AppHeader'
import AppNav from './AppNav'
import Viewer from './Viewer'

const AppMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const GridDiv = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: max-content auto;
`

const App = ({ bundle }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isGridOptionsOpen, setIsGridOptionsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('Button')

  const navItems = {
    Tokens: Object.keys(bundle.tokens),
    Components: Object.keys(bundle.components),
  }

  let selectedEntity = null
  if (navItems.Tokens[selectedItem]) {
    selectedEntity = bundle.tokens[selectedItem]
  } else {
    selectedEntity = bundle.components[selectedItem]
  }

  let type = null
  if (navItems.Tokens.includes(selectedItem)) {
    type = 'tokens'
  } else if (navItems.Components.includes(selectedItem)) {
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
          selectedItem={selectedItem}
          navItems={navItems}
          onSelect={setSelectedItem}
          isOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
        />
        <Viewer name={selectedItem} type={type} entity={selectedEntity} />
      </GridDiv>
    </AppMain>
  )
}

export default App
