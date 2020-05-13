import React from 'react'
import FieldLabel from './FieldLabel'

const ColorField = ({ name, value, onChange }) => {
  return (
    <>
      <FieldLabel>{name}</FieldLabel>
      <input
        type="color"
        placeholder=""
        value={value}
        onChange={(e) => onChange(e.target.value, e)}
      />
    </>
  )
}

export default ColorField
