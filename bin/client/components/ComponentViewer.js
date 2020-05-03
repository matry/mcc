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
      <Canvas />
    </StyledSection>
  )
}

export default ComponentViewer
