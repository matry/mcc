const { parseInputs, parseInputValue } = require('./inputs')

describe('inputs', () => {
  it('correctly parses single value input', () => {
    const result = parseInputValue('  Disabled: false')

    expect(result).toMatchObject({
      title: 'Disabled',
      defaultValue: 'false',
      options: [],
    })
  })

  it('correctly parses multi-value input', () => {
    const result = parseInputValue(' Size: small, *medium, large ')

    expect(result).toMatchObject({
      title: 'Size',
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
    })
  })
})
