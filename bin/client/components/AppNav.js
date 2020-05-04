import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { spacing } from '../theme'

const StyledH3 = styled.h3`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
`

const StyledNav = styled.nav`
  padding: ${spacing(1)}px;
`

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0px;
  margin-bottom: 8px;
`

const StyledItem = styled.li`
  padding-left: 20px;
  font-size: 14px;
  font-weight: 500;
`

const AppNav = ({ navTitles, isOpen, onClose, selectedTitle, onSelect }) => {
  const tokenTitles = navTitles['Tokens']
  const componentTitles = navTitles['Components']
  const [tokensOpen, setTokensOpen] = useState(true)
  const [componentsOpen, setComponentsOpen] = useState(true)

  return (
    <StyledNav>
      <StyledH3 onClick={() => setTokensOpen(!tokensOpen)}>
        {tokensOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        Tokens
      </StyledH3>
      {!tokensOpen ? null : (
        <StyledList>
          {tokenTitles.map((item) => (
            <StyledItem
              style={{ color: item === selectedTitle ? '#007bff' : '#000' }}
              key={item}
              onClick={() => {
                onSelect(item)
                onClose()
              }}
            >
              {item}
            </StyledItem>
          ))}
        </StyledList>
      )}

      <StyledH3 onClick={() => setComponentsOpen(!componentsOpen)}>
        {componentsOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        Components
      </StyledH3>
      {!componentsOpen ? null : (
        <StyledList>
          {componentTitles.map((item) => (
            <StyledItem
              style={{ color: item === selectedTitle ? '#007bff' : '#000' }}
              key={item}
              onClick={() => {
                onSelect(item)
                onClose()
              }}
            >
              {item}
            </StyledItem>
          ))}
        </StyledList>
      )}
    </StyledNav>
  )
}

export default AppNav
