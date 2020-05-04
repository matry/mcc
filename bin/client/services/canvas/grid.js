const paintGrid = (ctx, ctxBoundary, gridStyles) => {
  const { gridLineWidth, gridSpacing, gridColor } = gridStyles
  const previousLineWidth = ctx.lineWidth
  const previousStrokeStyle = ctx.strokeStyle
  const layoutBoundary = ctxBoundary.layout

  ctx.lineWidth = gridLineWidth
  ctx.strokeStyle = gridColor

  const maxX = layoutBoundary.right
  const minX = layoutBoundary.left

  const maxY = layoutBoundary.bottom
  const minY = layoutBoundary.top

  let currentX = layoutBoundary.centerX

  do {
    ctx.beginPath()
    ctx.moveTo(currentX, minY)
    ctx.lineTo(currentX, maxY)

    if (currentX === layoutBoundary.centerX) {
      ctx.strokeStyle = '#aaaaaa'
      ctx.stroke()
      ctx.strokeStyle = gridColor
    } else {
      ctx.stroke()
    }

    currentX += gridSpacing
  } while (currentX <= maxX)

  currentX = layoutBoundary.centerX

  do {
    currentX -= gridSpacing
    ctx.beginPath()
    ctx.moveTo(currentX, minY)
    ctx.lineTo(currentX, maxY)
    ctx.stroke()
  } while (currentX >= minX)

  let currentY = layoutBoundary.centerY

  do {
    ctx.beginPath()
    ctx.moveTo(minX, currentY)
    ctx.lineTo(maxX, currentY)

    if (currentY === layoutBoundary.centerY) {
      ctx.strokeStyle = '#aaaaaa'
      ctx.stroke()
      ctx.strokeStyle = gridColor
    } else {
      ctx.stroke()
    }

    ctx.stroke()
    currentY += gridSpacing
  } while (currentY <= maxY)

  currentY = layoutBoundary.centerY

  do {
    currentY -= gridSpacing
    ctx.beginPath()
    ctx.moveTo(minX, currentY)
    ctx.lineTo(maxX, currentY)
    ctx.stroke()
  } while (currentY >= minY)
}

export { paintGrid }
