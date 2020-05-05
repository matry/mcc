const getXCoordinates = (parentBoundary, styles) => {
  let left = 0

  if (styles.left !== null) {
    left = parentBoundary[styles.left]
  } else if (styles.centerX !== null) {
    left = parentBoundary[styles.centerX] - styles.width / 2
  } else if (styles.right !== null) {
    left = parentBoundary[styles.right] - styles.width
  }

  return {
    width: styles.width,
    left,
    centerX: left + styles.width / 2,
    right: left + styles.width,
  }
}

const getYCoordinates = (parentBoundary, styles) => {
  let top = 0

  if (styles.top !== null) {
    top = parentBoundary[styles.top]
  } else if (styles.centerY !== null) {
    top = parentBoundary[styles.centerY] - styles.height / 2
  } else if (styles.bottom !== null) {
    top = parentBoundary[styles.bottom] - styles.height
  }

  return {
    height: styles.height,
    top,
    centerY: top + styles.height / 2,
    bottom: top + styles.height,
  }
}

const generateLayoutBoundary = (parentTitle, parentBoundary, styles) => {
  if (!parentBoundary) {
    return {
      width: styles.width,
      height: styles.height,
      left: 0,
      centerX: styles.width / 2,
      right: styles.width,
      top: 0,
      centerY: styles.height / 2,
      bottom: styles.height,
    }
  } else if (parentTitle === 'root') {
    return {
      width: styles.width,
      height: styles.height,
      left: parentBoundary.width / 2 - styles.width / 2,
      centerX: styles.width / 2,
      right: parentBoundary.width / 2 + styles.width / 2,
      top: parentBoundary.height / 2 - styles.height / 2,
      centerX: parentBoundary.height / 2,
      bottom: parentBoundary.height / 2 + styles.height / 2,
    }
  }

  return {
    ...getXCoordinates(parentBoundary, styles),
    ...getYCoordinates(parentBoundary, styles),
  }
}

const generateContentBoundary = (layoutBoundary, styles) => {
  const { borderAlign, borderRadius } = styles

  let { top, right, bottom, left, width, height } = layoutBoundary
  let offset
  switch (styles.borderAlign) {
    case 'inside':
      offset = styles.borderWidth / 2
      break
    case 'outside':
      offset = -Math.abs(styles.borderWidth / 2)
      break
    default:
      offset = 0
      break
  }
  left += offset
  top += offset
  right -= offset * 2
  bottom -= offset * 2
  width -= offset * 2
  height -= offset * 2

  return {
    top,
    right,
    bottom,
    left,
    centerX: layoutBoundary.centerX,
    centerY: layoutBoundary.centerY,
    width,
    height,
  }
}

const generateBoundarySet = (fragments) => {
  const boundaryList = []
  const boundaryMap = {}

  fragments.forEach((fragment) => {
    const parentContentBoundary = boundaryMap[fragment.parent]
      ? boundaryMap[fragment.parent].content
      : null
    const layoutBoundary = generateLayoutBoundary(
      fragment.parent,
      parentContentBoundary,
      fragment.styles
    )

    boundaryList.push(fragment.title)
    boundaryMap[fragment.title] = {
      layout: layoutBoundary,
      content: generateContentBoundary(layoutBoundary, fragment.styles),
    }
  })

  return {
    boundaryList,
    boundaryMap,
  }
}

export {
  getXCoordinates,
  getYCoordinates,
  generateLayoutBoundary,
  generateContentBoundary,
  generateBoundarySet,
}
