import { element } from 'prop-types'

const stylePropertyMap = {
  'fill-color': (value) => {
    return {
      fillStyle: value,
    }
  },
  width: (width) => ({ width }),
  height: (height) => ({ height }),
}

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

const getElements = (bundle, componentTitle, results = []) => {
  let elements = listEntities(bundle, 'elements', { component: componentTitle })

  elements.forEach((element) => {
    if (element.ref) {
      results = getElements(bundle, element.ref, results)
    } else {
      results.push(element)
    }
  })

  return results
}

const painter = {
  render: (ctx, width, height, bundle, componentTitle) => {
    const elements = getElements(bundle, componentTitle)

    const renderNodes = [
      {
        width,
        height,
        fillStyle: 'transparent',
      },
    ]

    elements.forEach((element) => {
      const options = mapEntities(bundle, 'options', { component: element.component })
      const styles = listEntities(bundle, 'styles', {
        component: element.component,
        element: element.title,
      })

      let node = {}
      styles.forEach((style) => {
        let styleValue = style.value.toString()

        if (styleValue.includes('$')) {
          const option = options[`${element.component}.${styleValue.replace('$', '')}`]
          if (option) {
            switch (option.type) {
              case 'number':
                styleValue = Number(option.defaultValue)
                break
              default:
                styleValue = option.defaultValue
                break
            }
          }
        }

        node = { ...node, ...stylePropertyMap[style.property](styleValue) }
      })

      renderNodes.push(node)
    })

    renderNodes.forEach((node) => {
      const x = width / 2 - node.width / 2
      const y = height / 2 - node.height / 2

      ctx.fillStyle = node.fillStyle
      ctx.beginPath()
      ctx.rect(x, y, node.width, node.height)
      ctx.closePath()
      ctx.fill()
    })
  },
}

export default painter
