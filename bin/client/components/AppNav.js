import React from 'react'

const AppNav = ({ navItems, isOpen, onClose, selectedItem, onSelect }) => {
  const navKeys = Object.keys(navItems)

  return (
    <nav>
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
    </nav>
  )
}

export default AppNav
