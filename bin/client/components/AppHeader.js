import React from 'react'
import styled from '@emotion/styled'
import { colors, spacing } from '../theme'

const StyledHeader = styled.header`
  padding: ${spacing(1)}px;
  background: linear-gradient(45deg, ${colors.pink[400]} 30%, ${colors.deepOrange[300]} 90%);
`

const StyledH2 = styled.h2`
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
`

const AppHeader = ({ onToggleNav, onToggleGrid }) => {
  return (
    <StyledHeader>
      <StyledH2>Matry | mcc</StyledH2>
    </StyledHeader>
  )
}

export default AppHeader
