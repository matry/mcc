const paintNode = (ctx, width, height, node) => {
  const x = width / 2 - node.width / 2
  const y = height / 2 - node.height / 2

  ctx.fillStyle = node.fillStyle
  ctx.beginPath()
  ctx.rect(x, y, node.width, node.height)
  ctx.closePath()
  ctx.fill()
}

export { paintNode }

export default {
  paintNode,
}
