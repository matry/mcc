import { generatePointsForBorder } from './border'

describe('layout - border', () => {
  const mockBoundary = {
    width: 100,
    height: 100,
    x: 100,
    y: 100,
  }

  const mockPoints = generatePointsForBorder(mockBoundary)

  it('calculates top-left corner', () => {
    const { x, y } = mockPoints[0]

    expect(x).toBe(100)
    expect(y).toBe(100)
  })

  it('calculates top-right corner', () => {
    const { x, y } = mockPoints[1]

    expect(x).toBe(200)
    expect(y).toBe(100)
  })

  it('calculates bottom-right corner', () => {
    const { x, y } = mockPoints[2]

    expect(x).toBe(200)
    expect(y).toBe(200)
  })

  it('calculates bottom-right corner', () => {
    const { x, y } = mockPoints[3]

    expect(x).toBe(100)
    expect(y).toBe(200)
  })
})
