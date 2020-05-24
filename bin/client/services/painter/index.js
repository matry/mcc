import { paintNode } from './paint'
import { getComponentRenderNodes } from './renderNode'

const painter = {
  render: (ctx, width, height, bundle, componentKey) => {
    let renderNodes = [
      {
        width,
        height,
        fillStyle: 'transparent',
      },
    ]

    renderNodes = getComponentRenderNodes(bundle, componentKey, renderNodes)

    renderNodes.forEach((node) => {
      paintNode(ctx, width, height, node)
    })
  },
}

export default painter
