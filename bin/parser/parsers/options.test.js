const { parseOptionValue } = require('./options')

describe('options', () => {
  it('correctly parses single value option', () => {
    const result = parseOptionValue('boolean: false')

    expect(result).toMatchObject({
      type: 'boolean',
      defaultValue: 'false',
      options: [],
    })
  })

  it('correctly parses multi-value option', () => {
    const result = parseOptionValue(' string: small, *medium, large ')

    expect(result).toMatchObject({
      type: 'string',
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
    })
  })
})
