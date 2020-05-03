import React from 'react'
import styled from '@emotion/styled'
import Field from './Field'
import Canvas from './Canvas'

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: max-content auto;
`

const StyledDiv = styled.div``

const ComponentViewer = ({ name, component }) => {
  const { inputs } = component

  return (
    <StyledSection>
      <StyledDiv>
        <header>
          <h2>{name}</h2>
        </header>
        <form>
          <h3>Input</h3>
          {inputs.map(({ type, name }) => (
            <Field key={name} type={type} name={name} />
          ))}
        </form>
      </StyledDiv>
      <Canvas />
    </StyledSection>
  )
}

export default ComponentViewer
