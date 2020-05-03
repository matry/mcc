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

  const fragments = component.elements.list.map((title, index) => {
    const element = component.elements.map[title]
    const styles = {}

    if (component.styles[title]) {
      component.styles[title].forEach((style) => {
        styles[style.key] = style.value
      })
    }

    return {
      title,
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
          {inputs.list.map((inputTitle) => {
            const input = inputs.map[inputTitle]

            return <Field key={inputTitle} type={input.type} name={inputTitle} />
          })}
        </form>
      </StyledDiv>
      <Canvas gridOptions={{ gridPlacement: 'back' }} fragments={fragments} />
    </StyledSection>
  )
}

export default ComponentViewer
