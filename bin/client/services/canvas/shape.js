const paintShape = (
  ctx,
  {
    top = 0,
    left = 0,
    width = 0,
    height = 0,
    fill = 'transparent',
    strokeWidth = 0,
    strokeColor = 'transparent',
    cornerRadius = 0,
  }
) => {
  ctx.fillStyle = fill
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = strokeWidth

  const right = left + width
  const bottom = top + height

  ctx.beginPath()
  ctx.moveTo(left + cornerRadius, top)
  ctx.lineTo(right - cornerRadius, top)
  ctx.quadraticCurveTo(right, top, right, top + cornerRadius)
  ctx.lineTo(right, bottom - cornerRadius)
  ctx.quadraticCurveTo(right, bottom, right - cornerRadius, bottom)
  ctx.lineTo(left + cornerRadius, bottom)
  ctx.quadraticCurveTo(left, bottom, left, bottom - cornerRadius)
  ctx.lineTo(left, top + cornerRadius)
  ctx.quadraticCurveTo(left, top, left + cornerRadius, top)
  ctx.closePath()
  ctx.fill()

  // HTML5 Canvas will draw a border even if your line width is zero. So we cancel the operation if no border is defined.
  if (strokeWidth > 0) {
    ctx.stroke()
  }

  // Cleanup. TODO - add a generic cleanup utility somewhere.
  ctx.lineWidth = 0
}

export { paintShape }
