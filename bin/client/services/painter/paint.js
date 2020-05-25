const paintNode = (ctx, width, height, node) => {
  const x = node.left
  const y = node.top

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
