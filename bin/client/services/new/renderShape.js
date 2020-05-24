const renderShape = (ctx, styles) => {
  const { top, left, right, bottom, fillStyle, strokeStyle, lineWidth } = styles

  ctx.fillStyle = fillStyle
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(left, top)
  ctx.lineTo(right, top)
  ctx.lineTo(right, bottom)
  ctx.lineTo(left, bottom)
  ctx.lineTo(left, top)
  ctx.closePath()
  ctx.fill()

  // HTML5 Canvas will draw a border even if your line width is zero. So we cancel the operation if no border is defined.
  if (lineWidth > 0) {
    ctx.stroke()
  }

  // Cleanup. TODO - add a generic cleanup utility somewhere.
  ctx.lineWidth = 0
}

export default renderShape
