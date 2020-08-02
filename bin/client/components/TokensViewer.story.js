import React from 'react'
import TokensViewer from './TokensViewer'

const table = {
  values: {
    map: {
      a: {
        id: 'a',
        name: 'primary-blue',
        group: 'branding',
        type: 'color',
        body: '#007BFF',
        scope: 'root',
      },
      b: {
        id: 'b',
        name: 'primary-red',
        group: 'branding',
        type: 'color',
        body: '#FF0707',
        scope: 'root',
      },
    },
    list: ['a', 'b'],
  },
}

const getValuesByScope = (scope = 'root') => {
  const values = table.values.list.map((id) => {
    const value = table.values.map[id]

    if (value.scope !== scope) {
      return null
    }

    return value
  })

  return values.filter((value) => value !== null)
}

const groupBy = (entities, key) => {
  const results = {}

  entities.forEach((entity) => {
    results[entity[key]] = results[entity[key]] || []
    results[entity[key]].push(entity)
  })

  return results
}

const mockValues = getValuesByScope()

export default { title: 'Components/TokensViewer' }

export const Default = () => <TokensViewer valueGroups={groupBy(mockValues, 'group')} />
