const { parseKeyValue } = require('./line')

describe('line', () => {
  it('correctly parses key value', () => {
    const result = parseKeyValue('  somekey   somevalue   ')

    expect(result).toMatchObject({
      key: 'somekey',
      value: 'somevalue',
    })
  })
})
