import { generateRootFragment } from '../layout/fragment'
import { generateBoundarySet } from '../layout/boundary'
import { paintShape } from './shape'
import { paintGrid } from './grid'
import { paintText } from './text'

const renderFragments = (context, width, height, gridOptions, fragments) => {
  context.clearRect(0, 0, width, height)
  const { boundaryList, boundaryMap } = generateBoundarySet([
    generateRootFragment(width, height),
    ...fragments,
  ])

  if (gridOptions.gridPlacement === 'back') {
    paintGrid(context, boundaryMap.root, gridOptions)
  }

  boundaryList.forEach((title) => {
    const boundary = boundaryMap[title]
    const fragment = fragments.find((fragment) => fragment.title === title)

    if (!fragment) {
      return
    }

    switch (fragment.type) {
      case 'text':
        paintText(context, boundary.content, fragment.styles)
        break
      default:
        paintShape(context, boundary, fragment.styles)
        break
    }
  })

  if (gridOptions.gridPlacement === 'front') {
    paintGrid(context, boundaryMap.root, gridOptions)
  }
}

export { renderFragments }
