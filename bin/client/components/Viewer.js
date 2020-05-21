import React from 'react'
import ComponentViewer from './ComponentViewer'
import TokensViewer from './TokensViewer'

const Viewer = ({ name, type, bundle }) => {
  let rendered = null

  switch (type) {
    case 'component':
      rendered = <ComponentViewer bundle={bundle} name={name} />
      break
    case 'tokens':
      rendered = <TokensViewer bundle={bundle} name={name} />
      break
    default:
      break
  }

  return rendered
}

export default Viewer
