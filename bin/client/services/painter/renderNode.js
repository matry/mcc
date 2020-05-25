import styleProperties from './styleProperties'
import { listEntities } from './entity'
import { retrieveTokenValue } from './expression'

const getComponentRenderNodes = (bundle, componentKey) => {
  const initialNodes = initializeRenderNodes(bundle, componentKey)
  const populatedNodes = populateRenderNodes(bundle, initialNodes)

  return populatedNodes
}

const initializeRenderNodes = (bundle, componentKey, renderNodes) => {
  const elements = listEntities(bundle, 'elements', { component: componentKey })

  let results = renderNodes
    ? [...renderNodes]
    : [
        {
          component: componentKey,
          element: 'root',
          parent: null,
        },
      ]

  elements.forEach((element) => {
    if (element.ref) {
      results = initializeRenderNodes(bundle, element.ref, results)
      return
    }

    results.push({
      element: element.title,
      component: element.component,
      parent: element.parent || 'root',
    })
  })

  return results
}

const populateRenderNodes = (bundle, renderNodes) => {
  return renderNodes.map((node) => {
    const styles = listEntities(bundle, 'styles', {
      component: node.component,
      element: node.element,
    })

    let renderNode = { ...node }
    styles.forEach((style) => {
      let styleValue

      switch (style.operation) {
        case 'token':
          styleValue = retrieveTokenValue(bundle, node, style)
          break
        default:
          styleValue = style.value
          break
      }

      renderNode = { ...renderNode, ...styleProperties[style.property](styleValue) }
    })

    return renderNode
  })
}

export { getComponentRenderNodes, initializeRenderNodes, populateRenderNodes }

export default {
  getComponentRenderNodes,
  initializeRenderNodes,
  populateRenderNodes,
}
