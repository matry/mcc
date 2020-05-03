import React from 'react'
import styled from '@emotion/styled'
import { spacing } from '../theme'

const StyledNav = styled.nav`
  padding: ${spacing(1)}px;
`

const AppNav = ({ navItems, isOpen, onClose, selectedItem, onSelect }) => {
  const navKeys = Object.keys(navItems)

  return (
    <StyledNav>
      {navKeys.map((key, i) => {
        const items = navItems[key]

        return (
          <React.Fragment key={key}>
            <h3>{key}</h3>
            <ul>
              {items.map((item) => (
                <li
                  style={{ color: item === selectedItem ? '#007bff' : '#000' }}
                  key={`${key}_${item}`}
                  onClick={() => {
                    onSelect(item)
                    onClose()
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </React.Fragment>
        )
      })}
    </StyledNav>
  )
}

export default AppNav
