const { parseStyles } = require('./styles')

describe('styles', () => {
  it('correctly parses style lines', () => {
    const styleGroups = [
      ['style Container', 'color: red', 'font: arial'],
      ['style Label', 'width: 200', 'height: 100'],
    ]

    const result = parseStyles(styleGroups)

    expect(result).toMatchObject({
      Container: [
        {
          element: 'Container',
          context: null,
          key: 'color',
          value: 'red',
        },
        {
          element: 'Container',
          context: null,
          key: 'font',
          value: 'arial',
        },
      ],
      Label: [
        {
          element: 'Label',
          context: null,
          key: 'width',
          value: '200',
        },
        {
          element: 'Label',
          context: null,
          key: 'height',
          value: '100',
        },
      ],
    })
  })
})
