import React from 'react'
import { colors } from '../theme'

const AppHeader = ({ onToggleNav, onToggleGrid }) => {
  return (
    <header
      style={{
        padding: '8px',
        background: `linear-gradient(45deg, ${colors.pink[400]} 30%, ${colors.deepOrange[300]} 90%)`,
      }}
    >
      <h2>Matry</h2>
    </header>
  )
}

export default AppHeader
