import React from 'react'
import styled from '@emotion/styled'
import { spacing } from '../theme'
import InputForm from './InputForm'
import Canvas from './Canvas'

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: max-content auto;
`

const StyledDiv = styled.div`
  padding: 0px ${spacing(1)}px;
`

const StyledHeader = styled.header`
  margin-top: ${spacing(1.5)}px;
`

const StyledSmall = styled.small`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #777777;
  text-transform: uppercase;
`

const StyledH2 = styled.h2`
  font-weight: 500;
  font-size: 20px;
  color: #333333;
`

const ComponentViewer = ({ name, component }) => {
  const { inputs } = component

  const fragments = component.elements.map((element, index) => {
    let styles = {}

    if (component.styles[element.title]) {
      styles = component.styles[element.title]._default
    }

    return {
      title: element.title,
      parent: 'root',
      type: index === 0 ? 'group' : element.type,
      styles,
    }
  })

  return (
    <StyledSection>
      <StyledDiv>
        <StyledHeader>
          <StyledSmall>Viewing</StyledSmall>
          <StyledH2>{name}</StyledH2>
        </StyledHeader>
        <InputForm inputs={inputs} />
      </StyledDiv>
      <Canvas
        gridOptions={{
          gridColor: '#ddd',
          gridPlacement: 'back',
          gridSpacing: 10,
          gridLineWidth: 0.5,
        }}
        fragments={fragments}
      />
    </StyledSection>
  )
}

export default ComponentViewer
