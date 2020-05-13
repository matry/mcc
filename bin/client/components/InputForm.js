import React from 'react'
import styled from '@emotion/styled'
import { spacing } from '../theme'
import BooleanField from './BooleanField'
import StringField from './StringField'

const StyledForm = styled.form`
  margin-top: ${spacing(1.5)}px;
`

const StyledH5 = styled.h5`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #777777;
  text-transform: uppercase;
  margin-bottom: ${spacing(0.5)}px;
`

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-row-gap: 4px;
`

const generateField = ({ type, title }) => {
  let rendered = null
  const key = `field_${title}`

  switch (type) {
    case 'boolean':
      rendered = <BooleanField key={key} name={title} />
      break
    case 'string':
      rendered = <StringField key={key} name={title} />
      break
    default:
      break
  }

  return rendered
}

const InputForm = ({ inputs }) => {
  return (
    <StyledForm>
      <StyledH5>Inputs</StyledH5>
      <StyledDiv>{inputs.map(generateField)}</StyledDiv>
    </StyledForm>
  )
}

export default InputForm