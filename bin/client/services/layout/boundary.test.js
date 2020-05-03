import { getXCoordinates, getYCoordinates } from './boundary'

describe('layout - X coordinates', () => {
  const mockBoundary = {
    width: 500,
    height: 500,
    left: 100,
    centerX: 350,
    right: 600,
    top: 100,
    centerY: 350,
    bottom: 600,
  }

  it('aligns center x for boundary', () => {
    const mockStyles = {
      width: 100,
      height: 100,
      left: null,
      centerX: 'centerX',
      right: null,
    }

    const { left, centerX, right } = getXCoordinates(mockBoundary, mockStyles)

    expect(left).toBe(350)
    expect(centerX).toBe(400)
    expect(right).toBe(450)
  })

  it('aligns right x for boundary', () => {
    const mockStyles = {
      width: 100,
      height: 100,
      left: null,
      centerX: 'right',
      right: null,
    }

    const { left, centerX, right } = getXCoordinates(mockBoundary, mockStyles)

    expect(left).toBe(600)
    expect(centerX).toBe(650)
    expect(right).toBe(700)
  })
})

describe('layout - Y coordinates', () => {
  const mockBoundary = {
    width: 500,
    height: 500,
    left: 100,
    centerX: 350,
    right: 600,
    top: 100,
    centerY: 350,
    bottom: 600,
  }

  it('aligns center y for boundary', () => {
    const mockStyles = {
      width: 100,
      height: 100,
      top: 'centerY',
      centerY: null,
      bottom: null,
    }

    const { top, centerY, bottom } = getYCoordinates(mockBoundary, mockStyles)

    expect(top).toBe(350)
    expect(centerY).toBe(400)
    expect(bottom).toBe(450)
  })

  it('aligns right y for boundary', () => {
    const mockStyles = {
      width: 100,
      height: 100,
      top: 'bottom',
      centerY: null,
      bottom: null,
    }

    const { top, centerY, bottom } = getYCoordinates(mockBoundary, mockStyles)

    expect(top).toBe(600)
    expect(centerY).toBe(650)
    expect(bottom).toBe(700)
  })
})
