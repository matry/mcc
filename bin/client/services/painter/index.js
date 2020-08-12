import { paintShape } from '../canvas/shape'
import { paintText } from '../canvas/text'

const painter = {
  render: (ctx, width, height, nodes) => {
    let rootLeft
    let rootTop

    nodes.forEach((node) => {
      let top = 0
      let left = 0

      if (node.root) {
        top = height / 2 - node.height / 2
        left = width / 2 - node.width / 2
        rootTop = top
        rootLeft = left
      } else {
        top = rootTop + node.top
        left = rootLeft + node.left
      }

      // let left = width / 2 - offsetLeft - node.width / 2 + node.left
      // let top = height / 2 - offsetLeft - node.height / 2 + node.top

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
