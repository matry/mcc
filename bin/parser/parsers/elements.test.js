const { parseElements } = require('./elements')

describe('elements', () => {
  it('correctly parses element blocks', () => {
    const result = parseElements(['elements', 'Container shape', 'Label text'])

    expect(result).toHaveLength(2)

    expect(result[0]).toMatchObject({
      title: 'Container',
      type: 'shape',
      parent: null,
    })

    expect(result[1]).toMatchObject({
      title: 'Label',
      type: 'text',
      parent: null,
    })
  })
})
