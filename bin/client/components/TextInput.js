import React from 'react'

const TextInput = ({ value, onChange, placeholder }) => {
  return <input value={value} onChange={onChange} placeholder={placeholder} />
}

export default TextInput
