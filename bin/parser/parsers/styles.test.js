const { parseStyles } = require('./styles')

describe('styles', () => {
  it('correctly parses style lines', () => {
    const styleGroups = [
      ['style Container', 'color: red', 'font: arial'],
      ['style Label', 'width: 200', 'height: 100'],
    ]

    const result = parseStyles(styleGroups)

    expect(result.Container).toHaveLength(1)
    expect(result.Label).toHaveLength(1)
  })
})
