import { element } from 'prop-types'

const NODE = {
  parent: null,
  type: null,
  computedValues: {
    width: null,
    height: null,
    'fill-color': null,
    'left-left': null,
    'left-right': null,
    'top-top': null,
    'top-bottom': null,
    'right-right': null,
    'right-left': null,
    'bottom-bottom': null,
    'bottom-top': null,
    'center-x-left': null,
    'center-x-right': null,
    'center-y-top': null,
    'center-y-bottom': null,
  },
}

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
      results.push(nestedElements)
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

const getOptions = (componentName, options, index = -1, result = {}) => {
  Object.entries(options).map(([optionKey, optionValue]) => {
    if (Array.isArray(optionValue)) {
      optionValue.forEach((optionObj, index) => {
        result = {
          ...result,
          ...getOptions(optionKey, optionObj, index, result),
        }
      })
    } else {
      result[`${componentName}${index !== -1 ? '.' + (index + 1) : ''}.${optionKey}`] = optionValue
    }
  })

  return result
}

const calculate = (bundle, componentName, options) => {
  console.log('>')
  console.log(bundle)
  console.log('<')

  const targetComponent = bundle.components.map[componentName]

  const computedOptions = getOptions(componentName, options)
  console.log(computedOptions)
}

const getElements = (bundle, componentName) => {
  return bundle.elements.list
    .map((id) => {
      const entity = bundle.elements.map[id]
      return entity.component === componentName ? entity : null
    })
    .filter((element) => element !== null)
}

const getComputedElements = (bundle, componentName, options, result = []) => {
  const elements = getElements(bundle, componentName)

  elements.forEach(({ title, type, ref }) => {
    if (type === 'instance') {
      if (Array.isArray(options[title])) {
        options[title].forEach((nestedOptions) => {
          result = [...result, ...getComputedElements(bundle, ref, nestedOptions, result)]
        })
      } else {
        result = getComputedElements(bundle, ref, options[title], result)
      }

      return
    }

    const styles = findByKey(bundle.styles, 'component', componentName).filter(
      (style) => style.element === title
    )

    result.push({
      title,
      type,
      styles,
    })
  })

  return result
}

export default calculate
