const { parseElements } = require('./elements')

describe('elements', () => {
  it('correctly parses element blocks', () => {
    const result = parseElements(['elements', '  shape     Container', 'text Label  '])

    expect(result).toMatchObject({
      map: {
        Container: {
          type: 'shape',
          title: 'Container',
        },
        Label: {
          type: 'text',
          title: 'Label',
        },
      },
      list: ['Container', 'Label'],
    })
  })
})
