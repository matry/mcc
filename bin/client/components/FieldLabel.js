import React from 'react'
import styled from '@emotion/styled'

const StyledLabel = styled.label`
  margin-right: 16px;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
`

const FieldLabel = ({ children }) => {
  return <StyledLabel>{children}</StyledLabel>
}

export default FieldLabel
