const paintGrid = ({ ctx, width, height, gridOptions }) => {
  const { gridLineWidth, gridSpacing, gridColor } = gridOptions
  const layoutBoundary = {
    left: 0,
    right: width,
    top: 0,
    bottom: height,
    centerX: width / 2,
    centerY: height / 2,
  }

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
      ctx.strokeStyle = '#888888'
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
      ctx.strokeStyle = '#888888'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.strokeStyle = gridColor
      ctx.lineWidth = gridLineWidth
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
