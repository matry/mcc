const findByKey = (table, key, value) => {
  const results = []

  table.list.forEach((id) => {
    const entity = table.map[id]
    if (entity[key] === value) {
      results.push(entity)
    }
  })

  return results
}

const findElements = (bundle, componentName) => {
  let results = []
  const elements = findByKey(bundle.elements, 'component', componentName)

  elements.forEach((element) => {
    if (element.type === 'instance') {
      const nestedElements = findElements(bundle, element.ref)
      nestedElements[0].parent = results[results.length - 1].key

      results = [...results, ...nestedElements]
    } else {
      results.push({
        key: element.key,
        parent: element.parent,
        title: element.title,
        type: element.type,
      })
    }
  })

  return results
}

const calculate = (bundle, componentName, input) => {
  console.log('>')
  console.log(bundle)
  console.log('<')

  const targetComponent = bundle.components.map[componentName]
  const targetElements = findElements(bundle, componentName)
  const targetOptions = findByKey(bundle.options, 'component', componentName)
  const targetValues = findByKey(bundle.values, 'component', componentName)

  console.log('> elements')
  console.log(targetElements)
}

export default calculate
