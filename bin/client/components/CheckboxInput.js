import React from 'react'

const CheckboxInput = ({ value, onChange, ...props }) => {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={(event) => onChange(event.target.checked, event)}
      {...props}
    />
  )
}

export default CheckboxInput
