import { paintShape } from '../canvas/shape'
import { paintText } from '../canvas/text'

const painter = {
  render: (ctx, width, height, nodes) => {
    nodes.forEach((node) => {
      const left = width / 2 - node.width / 2 + node.left
      const top = height / 2 - node.height / 2 + node.top

      switch (node.type) {
        case 'shape':
          paintShape(ctx, { ...node, top, left })
          break
        case 'text':
          paintText(ctx, { ...node, top, left })
          break
        default:
          break
      }
    })
  },
}

export default painter
