import React from 'react'
import FieldLabel from './FieldLabel'
import CheckboxInput from './CheckboxInput'

const BooleanField = ({ name }) => {
  return (
    <fieldset>
      <FieldLabel>{name}</FieldLabel>
      <CheckboxInput value={false} onChange={() => {}} />
    </fieldset>
  )
}

export default BooleanField
