import React from 'react'
import styled from '@emotion/styled'
import { Menu } from '@material-ui/icons'
import { colors, spacing } from '../theme'

const StyledHeader = styled.header`
  padding: ${spacing(1)}px;
  background: linear-gradient(45deg, ${colors.pink[400]} 30%, ${colors.deepOrange[300]} 90%);
  display: flex;
  align-items: center;
`

const StyledH2 = styled.h2`
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
`

const StyledButton = styled.button`
  border: none;
  padding: 0px;
  background: none;
  color: #ffffff;
  cursor: pointer;
  margin-right: ${spacing(1)}px;

  &:focus {
    outline: 0;
  }
`

const AppHeader = ({ onToggleNav }) => {
  return (
    <StyledHeader>
      <StyledButton onClick={onToggleNav}>
        <Menu />
      </StyledButton>
      <StyledH2>Matry | mcc</StyledH2>
    </StyledHeader>
  )
}

export default AppHeader
