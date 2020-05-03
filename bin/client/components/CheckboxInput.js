import React from 'react'

const CheckboxInput = ({ value, onChange }) => {
  return <input type="checkbox" checked={value} onChange={onChange} />
}

export default CheckboxInput
