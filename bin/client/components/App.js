import React from 'react'
import styled from '@emotion/styled'
import { spacing, colors } from '../theme'
import Canvas from './Canvas'

const AppContainer = styled.main`
  height: 100%;
  display: grid;
  grid-template-rows: max-content auto;
`

const AppHeader = styled.header`
  padding: ${spacing(1.5)}px;
  background: linear-gradient(45deg, ${colors.pink[400]} 30%, ${colors.deepOrange[300]} 90%);
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
`

const AppBody = styled.section`
  display: grid;
  grid-template-columns: max-content 1fr;
  overflow: hidden;
`

const AppList = styled.ul`
  padding: ${spacing(2)}px 0px;
  list-style: none;
  border-right: 1px solid #ddd;
`

const AppItem = styled.li`
  padding: 7px ${spacing(4)}px 7px ${spacing(1.5)}px;
  background: ${(props) => (props.active ? colors.grey[700] : 'transparent')};
  color: ${(props) => (props.active ? '#FFFFFF' : colors.grey[700])};
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  cursor: pointer;
`

const CanvasDiv = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`

const CanvasContainer = styled.div``

const App = ({ bundle }) => {
  const name = bundle.components.list[0]

  return (
    <AppContainer>
      <AppHeader>Matry | mvp</AppHeader>
      <AppBody>
        <AppList>
          <AppItem>Block</AppItem>
          <AppItem active>List</AppItem>
          <AppItem>Button sihudf isduhfg idsfhgu</AppItem>
        </AppList>

        {/* <CanvasDiv>
          <CanvasContainer>
            <Canvas
              bundle={bundle}
              component={name}
              gridOptions={{
                gridColor: '#ddd',
                gridPlacement: 'back',
                gridSpacing: 10,
                gridLineWidth: 0.5,
              }}
            />
          </CanvasContainer>

          <CanvasContainer>
            <Canvas
              bundle={bundle}
              component={name}
              gridOptions={{
                gridColor: '#ddd',
                gridPlacement: 'back',
                gridSpacing: 10,
                gridLineWidth: 0.5,
              }}
            />
          </CanvasContainer>

          <CanvasContainer>
            <Canvas
              bundle={bundle}
              component={name}
              gridOptions={{
                gridColor: '#ddd',
                gridPlacement: 'back',
                gridSpacing: 10,
                gridLineWidth: 0.5,
              }}
            />
          </CanvasContainer>

          <CanvasContainer>
            <Canvas
              bundle={bundle}
              component={name}
              gridOptions={{
                gridColor: '#ddd',
                gridPlacement: 'back',
                gridSpacing: 10,
                gridLineWidth: 0.5,
              }}
            />
          </CanvasContainer>
        </CanvasDiv> */}
      </AppBody>
    </AppContainer>
  )
}

export default App
