import React from 'react'
import styled from '@emotion/styled'

const StyledLabel = styled.label`
  margin-right: 16px;
`

const FieldLabel = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>
}

export default FieldLabel
