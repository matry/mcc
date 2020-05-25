const areAllDimensionsSolved = (node) => {
  return areXDimensionsSolved(node) && areYDimensionsSolved(node)
}

const areXDimensionsSolved = (node) => {
  if (node.width === null) {
    return false
  }

  if (node.right === null) {
    return false
  }

  if (node.left === null) {
    return false
  }

  if (node.centerX === null) {
    return false
  }

  return true
}

const areYDimensionsSolved = (node) => {
  if (node.height === null) {
    return false
  }

  if (node.top === null) {
    return false
  }

  if (node.bottom === null) {
    return false
  }

  if (node.centerY === null) {
    return false
  }

  return true
}

const solveXDimensions = (styleMap, nodes, node) => {
  const parentNode = nodes.find((n) => n.key === node.parent)

  if (!parentNode) {
    return node
  }

  let result = { ...node }

  result.width = solveWidth(styleMap, parentNode, result)
  result.left = solveLeft(styleMap, parentNode, result)
  result.right = solveRight(styleMap, parentNode, result)

  return result
}

const solveYDimensions = (styleMap, nodes, node) => {
  const parentNode = nodes.find((n) => n.key === node.parent)

  if (!parentNode) {
    return node
  }

  let result = { ...node }

  result.height = solveHeight(styleMap, parentNode, result)
  result.top = solveTop(styleMap, parentNode, result)
  result.bottom = solveBottom(styleMap, parentNode, result)

  return result
}

const solveTop = (styleMap, parentNode, node) => {
  if (typeof node.top === 'number') {
    return node.top
  }

  if (parentNode.key === 'root') {
    if (typeof node.height === 'number') {
      return parentNode.height / 2 - node.height / 2
    }

    return null
  }

  if (typeof styleMap.top === 'number' && typeof parentNode.top === 'number') {
    return parentNode.top + styleMap.top
  }

  if (typeof node.height === 'number' && typeof node.bottom === 'number') {
    return node.bottom - node.height
  }

  return null
}

const solveLeft = (styleMap, parentNode, node) => {
  if (typeof node.left === 'number') {
    return node.left
  }

  if (parentNode.key === 'root') {
    if (typeof node.width === 'number') {
      return parentNode.width / 2 - node.width / 2
    }

    return null
  }

  if (typeof styleMap.left === 'number' && typeof parentNode.left === 'number') {
    return parentNode.left + styleMap.left
  }

  if (typeof node.width === 'number' && typeof node.right === 'number') {
    return node.right - node.width
  }

  return null
}

const solveBottom = (styleMap, parentNode, node) => {
  if (typeof node.bottom === 'number') {
    return node.bottom
  }

  if (parentNode.key === 'root') {
    if (typeof node.height === 'number') {
      return parentNode.height / 2 + node.height / 2
    }

    return null
  }

  if (
    typeof styleMap.bottom === 'number' &&
    typeof parentNode.height === 'number' &&
    typeof parentNode.top === 'number'
  ) {
    return parentNode.top + parentNode.height - styleMap.bottom
  }

  if (typeof node.top === 'number' && typeof node.height === 'number') {
    return node.top + node.height
  }

  return null
}

const solveRight = (styleMap, parentNode, node) => {
  if (typeof node.right === 'number') {
    return node.right
  }

  if (parentNode.key === 'root') {
    if (typeof node.width === 'number') {
      return parentNode.width / 2 + node.width / 2
    }

    return null
  }

  if (typeof styleMap.right === 'number' && typeof parentNode.right === 'number') {
    return parentNode.right - styleMap.right
  }

  if (typeof node.left === 'number' && typeof node.width === 'number') {
    return node.left + node.width
  }

  return null
}

const solveWidth = (styleMap, parentNode, node) => {
  if (typeof node.width === 'number') {
    return node.width
  }

  if (typeof styleMap.width === 'number') {
    return styleMap.width
  }

  if (typeof node.left === 'number' && typeof node.right === 'number') {
    return node.right - node.left
  }

  return null
}

const solveHeight = (styleMap, parentNode, node) => {
  if (typeof node.height === 'number') {
    return node.height
  }

  if (typeof styleMap.height === 'number') {
    return styleMap.height
  }

  if (typeof node.top === 'number' && typeof node.bottom === 'number') {
    return node.bottom - node.top
  }

  return null
}

export {
  areAllDimensionsSolved,
  areXDimensionsSolved,
  areYDimensionsSolved,
  solveXDimensions,
  solveYDimensions,
}

export default {
  areAllDimensionsSolved,
  areXDimensionsSolved,
  areYDimensionsSolved,
  solveXDimensions,
}
