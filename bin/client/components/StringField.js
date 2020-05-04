import React from 'react'
import styled from '@emotion/styled'
import TextInput from './TextInput'
import FieldLabel from './FieldLabel'

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StringField = ({ name, value }) => {
  return (
    <StyledDiv>
      <FieldLabel>{name}</FieldLabel>
      <TextInput value={value} onChange={() => {}} placeholder="" />
    </StyledDiv>
  )
}

export default StringField
