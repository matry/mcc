import styleProperties from './styleProperties'
import { mapEntities, listEntities } from './entity'

const generateRenderNode = (bundle, element) => {
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

    node = { ...node, ...styleProperties[style.property](styleValue) }
  })

  return node
}

const getComponentRenderNodes = (bundle, componentKey, renderNodes) => {
  const elements = listEntities(bundle, 'elements', { component: componentKey })

  let results = [...renderNodes]
  elements.forEach((element) => {
    if (element.ref) {
      results = getComponentRenderNodes(bundle, element.ref, results)
      return
    }

    results.push(generateRenderNode(bundle, element))
  })

  return results
}

export { generateRenderNode, getComponentRenderNodes }

export default {
  generateRenderNode,
  getComponentRenderNodes,
}
