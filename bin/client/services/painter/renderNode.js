import styleProperties from './styleProperties'
import { listEntities } from './entity'
import { getTokenValue } from './expression'
import { solveXDimensions, solveYDimensions, areAllDimensionsSolved } from './dimensions'

const ROOT_NODE_KEY = 'root'

const countUnresolved = (renderNodes) => {
  let count = 0

  renderNodes.forEach(({ component, element, width, height, top, right, bottom, left }) => {
    if (width === null) {
      count++
    }

    if (height === null) {
      count++
    }

    if (top === null) {
      count++
    }

    if (right === null) {
      count++
    }

    if (bottom === null) {
      count++
    }

    if (left === null) {
      count++
    }
  })

  return count
}

const getDefaultProperties = () => {
  return {
    width: null,
    height: null,
    top: null,
    right: null,
    bottom: null,
    left: null,
    centerX: null,
    centerY: null,
    fillStyle: null,
  }
}

const initializeRootNode = (width, height, componentKey) => {
  return {
    ...getDefaultProperties(),
    key: ROOT_NODE_KEY,
    component: componentKey,
    element: ROOT_NODE_KEY,
    parent: null,
    width,
    height,
    top: 0,
    right: width,
    bottom: height,
    left: 0,
    centerX: width / 2,
    centerY: height / 2,
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
      ...getDefaultProperties(),
      key: element.key,
      element: element.title,
      component: element.component,
      parent: element.parent || ROOT_NODE_KEY,
    })
  })

  return results
}

const mapStyles = (bundle, node) => {
  const styleList = listEntities(bundle, 'styles', {
    component: node.component,
    element: node.element,
  })

  const result = {}
  styleList.forEach(({ property, value }) => {
    result[property] = value
  })

  return result
}

const populateRenderNodes = (bundle, renderNodes, unresolvedCount) => {
  const results = renderNodes.map((node) => {
    const styleList = listEntities(bundle, 'styles', {
      component: node.component,
      element: node.element,
    })
    const styleMap = mapStyles(bundle, node)

    let renderNode = { ...node }
    styleList.forEach((style) => {
      if (style.property === 'fill-color') {
        renderNode.fillStyle = style.value
      }
    })

    if (!areAllDimensionsSolved(renderNode)) {
      renderNode = solveXDimensions(styleMap, renderNodes, renderNode)
      renderNode = solveYDimensions(styleMap, renderNodes, renderNode)
    }

    return renderNode
  })

  const constraintCount = countUnresolved(results)

  if (typeof unresolvedCount === 'number' && unresolvedCount === constraintCount) {
    throw new Error('Encountered an infinite loop')
  }

  if (constraintCount > 0) {
    return populateRenderNodes(bundle, results, constraintCount)
  }

  return results
}

export { initializeRootNode, initializeRenderNodes, populateRenderNodes }

export default {
  initializeRootNode,
  initializeRenderNodes,
  populateRenderNodes,
}
