import React from 'react'
import styled from '@emotion/styled'
import FieldLabel from './FieldLabel'
import CheckboxInput from './CheckboxInput'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;

  & input {
    display: block;
  }
`

const BooleanField = ({ name }) => {
  return (
    <>
      <FieldLabel>{name}</FieldLabel>
      <StyledDiv>
        <CheckboxInput value={false} onChange={() => {}} />
      </StyledDiv>
    </>
  )
}

export default BooleanField
