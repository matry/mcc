import React from 'react'
import styled from '@emotion/styled'
import { spacing } from '../theme'

const StyledNav = styled.nav`
  padding: ${spacing(1)}px;
`

const AppNav = ({ navTitles, isOpen, onClose, selectedTitle, onSelect }) => {
  const navKeys = Object.keys(navTitles)

  return (
    <StyledNav>
      {navKeys.map((key, i) => {
        const titles = navTitles[key]

        return (
          <React.Fragment key={key}>
            <h3>{key}</h3>
            <ul>
              {titles.map((item) => (
                <li
                  style={{ color: item === selectedTitle ? '#007bff' : '#000' }}
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
