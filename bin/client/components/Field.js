import React from 'react'
import BooleanField from './BooleanField'
import StringField from './StringField'

const Field = ({ type, name }) => {
  let rendered = null

  switch (type) {
    case 'boolean':
      rendered = <BooleanField name={name} />
      break
    case 'string':
      rendered = <StringField name={name} />
      break
    default:
      break
  }

  return rendered
}

export default Field
