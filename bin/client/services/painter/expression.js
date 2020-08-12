import { mapEntities } from './entity'

const getTokenValue = (bundle, node, style) => {
  const options = mapEntities(bundle, 'options', { component: node.component })
  const option = options[`${node.component}.${style.value.replace('$', '')}`]

  if (option) {
    switch (option.type) {
      case 'number':
        return Number(option.defaultValue)
      default:
        return option.defaultValue
        break
    }
  }

  return style.value
}

const getPropertyValue = (bundle, nodes, node, style) => {
  const expression = style.value.replace('@', '').split('.')
  let elementKey = expression[0]
  let property = expression[1]

  if (!elementKey) {
    return null
  }

  if (elementKey === 'parent') {
    elementKey = node.parent
  }

  const referenceNode = nodes.find((n) => n.element === elementKey)

  if (referenceNode[property] !== null) {
    return referenceNode[property]
  }

  return null
}

// Given a component, return total list of expressions to be evaluated into render_values
const createExpressionMap = () => {}

// Given a bundle and a component ID, return total list of values to be rendered
const createRenderMap = (component_id) => {}

export { getTokenValue, getPropertyValue }

export default {
  getTokenValue,
  getPropertyValue,
}
