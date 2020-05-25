import styleProperties from './styleProperties'
import { listEntities } from './entity'
import { retrieveTokenValue } from './expression'

const ROOT_NODE_KEY = 'root'

const initializeRootNode = (width, height, componentKey) => {
  return {
    component: componentKey,
    element: ROOT_NODE_KEY,
    parent: null,
    width,
    height,
    top: 0,
    right: width,
    bottom: height,
    left: 0,
    fillStyle: 'transparent',
  }
}

const initializeRenderNodes = (bundle, componentKey) => {
  const elements = listEntities(bundle, 'elements', { component: componentKey })

  let results = []

  elements.forEach((element) => {
    if (element.ref) {
      results = initializeRenderNodes(bundle, element.ref, results)
      return
    }

    results.push({
      element: element.title,
      component: element.component,
      parent: element.parent || ROOT_NODE_KEY,
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

export { initializeRootNode, initializeRenderNodes, populateRenderNodes }

export default {
  initializeRootNode,
  initializeRenderNodes,
  populateRenderNodes,
}
