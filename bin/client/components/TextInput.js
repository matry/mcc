import React from 'react'
import styled from '@emotion/styled'

const StyledInput = styled.input`
  border-radius: 2px;
  border: 1px solid #aaaaaa;
  padding: 4px 8px;
  display: block;

  &:focus {
    outline: 0;
    border-color: #007bff;
  }
`

const TextInput = ({ value, onChange, placeholder }) => {
  return (
    <StyledInput
      value={value}
      onChange={(e) => onChange(e.target.value, e)}
      placeholder={placeholder}
    />
  )
}

export default TextInput
