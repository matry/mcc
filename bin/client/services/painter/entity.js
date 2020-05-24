const mapEntities = (bundle, entityKey, queryObj) => {
  const entities = {}

  bundle[entityKey].list.forEach((key) => {
    const entity = bundle[entityKey].map[key]
    let match = true

    Object.entries(queryObj).forEach(([queryKey, queryValue]) => {
      if (entity[queryKey] !== queryValue) {
        match = false
      }
    })

    if (match) {
      entities[key] = entity
    }
  })

  return entities
}

const listEntities = (bundle, entityKey, queryObj) => {
  const entities = bundle[entityKey].list.map((key) => {
    const entity = bundle[entityKey].map[key]
    let match = true

    Object.entries(queryObj).forEach(([queryKey, queryValue]) => {
      if (entity[queryKey] !== queryValue) {
        match = false
      }
    })

    return match ? entity : null
  })

  return entities.filter((entity) => entity !== null)
}

export { mapEntities, listEntities }

export default {
  mapEntities,
  listEntities,
}
