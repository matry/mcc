import React from 'react'
import ComponentViewer from './ComponentViewer'
import TokensViewer from './TokensViewer'

const Viewer = ({ name, type, entity }) => {
  let rendered = null

  switch (type) {
    case 'component':
      rendered = <ComponentViewer name={name} component={entity} />
      break
    case 'tokens':
      rendered = <TokensViewer name={name} tokens={entity} />
      break
    default:
      break
  }

  return rendered
}

export default Viewer
