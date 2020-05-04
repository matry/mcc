import React from 'react'
import styled from '@emotion/styled'
import { spacing } from '../theme'
import Field from './Field'
import Canvas from './Canvas'

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: max-content auto;
`

const StyledDiv = styled.div`
  padding: ${spacing(1)}px;
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
        <header>
          <h2>{name}</h2>
        </header>
        <form>
          <h3>Input</h3>
          {inputs.map((input) => {
            return <Field key={input.title} type={input.type} name={input.title} />
          })}
        </form>
      </StyledDiv>
      <Canvas gridOptions={{ gridPlacement: 'back' }} fragments={fragments} />
    </StyledSection>
  )
}

export default ComponentViewer
