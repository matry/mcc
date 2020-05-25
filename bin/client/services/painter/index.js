import { paintNode } from './paint'
import { initializeRootNode, initializeRenderNodes, populateRenderNodes } from './renderNode'

const painter = {
  render: (ctx, width, height, bundle, componentKey) => {
    const initialNodes = [
      initializeRootNode(width, height, componentKey),
      ...initializeRenderNodes(bundle, componentKey),
    ]
    const populatedNodes = populateRenderNodes(bundle, initialNodes)

    populatedNodes.forEach((node) => {
      paintNode(ctx, width, height, node)
    })
  },
}

export default painter
