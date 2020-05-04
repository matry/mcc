import React from 'react'
import styled from '@emotion/styled'
import FieldLabel from './FieldLabel'
import CheckboxInput from './CheckboxInput'

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const BooleanField = ({ name }) => {
  return (
    <StyledDiv>
      <FieldLabel>{name}</FieldLabel>
      <CheckboxInput value={false} onChange={() => {}} />
    </StyledDiv>
  )
}

export default BooleanField
