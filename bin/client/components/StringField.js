import React from 'react'
import TextInput from './TextInput'
import FieldLabel from './FieldLabel'

const StringField = ({ name, value }) => {
  return (
    <fieldset>
      <FieldLabel>{name}</FieldLabel>
      <TextInput value={value} onChange={() => {}} placeholder="" />
    </fieldset>
  )
}

export default StringField
