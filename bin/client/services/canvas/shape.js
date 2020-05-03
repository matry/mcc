const paintShape = (ctx, boundary, styles) => {
  const { borderRadius, fillColor, borderColor, borderWidth } = styles

  let { top, right, bottom, left, width, height } = boundary.content

  ctx.fillStyle = fillColor
  ctx.strokeStyle = borderColor
  ctx.lineWidth = borderWidth
  ctx.beginPath()
  ctx.moveTo(left + borderRadius, top)
  ctx.lineTo(right - borderRadius, top)
  ctx.quadraticCurveTo(right, top, right, top + borderRadius)
  ctx.lineTo(right, bottom - borderRadius)
  ctx.quadraticCurveTo(right, bottom, right - borderRadius, bottom)
  ctx.lineTo(left + borderRadius, bottom)
  ctx.quadraticCurveTo(left, bottom, left, bottom - borderRadius)
  ctx.lineTo(left, top + borderRadius)
  ctx.quadraticCurveTo(left, top, left + borderRadius, top)
  ctx.closePath()
  ctx.fill()

  // HTML5 Canvas will draw a border even if your line width is zero. So we cancel the operation if no border is defined.
  if (borderWidth > 0) {
    ctx.stroke()
  }

  // Cleanup. TODO - add a generic cleanup utility somewhere.
  ctx.lineWidth = 0
}

export { paintShape }
