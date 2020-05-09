const { parseOptionValue } = require('./options')

describe('options', () => {
  it('correctly parses single value option', () => {
    const result = parseOptionValue('  Disabled: false')

    expect(result).toMatchObject({
      title: 'Disabled',
      defaultValue: 'false',
      options: [],
    })
  })

  it('correctly parses multi-value option', () => {
    const result = parseOptionValue(' Size: small, *medium, large ')

    expect(result).toMatchObject({
      title: 'Size',
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
    })
  })
})
