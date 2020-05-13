import React from 'react'
import TextInput from './TextInput'
import FieldLabel from './FieldLabel'

const StringField = ({ name, value, onChange }) => {
  return (
    <>
      <FieldLabel>{name}</FieldLabel>
      <TextInput value={value} onChange={onChange} placeholder="" />
    </>
  )
}

export default StringField
