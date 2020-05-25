import { mapEntities } from './entity'

const retrieveTokenValue = (bundle, node, style) => {
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

export { retrieveTokenValue }

export default {
  retrieveTokenValue,
}
