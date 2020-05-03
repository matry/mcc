/**
 *
 * @param {boundary} boundary is a shallow object specifying the boundary cooridinates for the UI fragment: { x, y, width, height }
 * @return {array} of points
 */
const generatePointsForBorder = boundary => {
  const sequencePhases = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft']

  return sequencePhases.map(phase => {
    let x
    let y

    switch (phase) {
      case 'topLeft':
        x = boundary.x
        y = boundary.y
        break
      case 'topRight':
        x = boundary.x + boundary.width
        y = boundary.y
        break
      case 'bottomRight':
        x = boundary.x + boundary.width
        y = boundary.y + boundary.height
        break
      case 'bottomLeft':
        x = boundary.x
        y = boundary.y + boundary.height
        break
    }

    return {
      x,
      y,
    }
  })
}

export { generatePointsForBorder }
