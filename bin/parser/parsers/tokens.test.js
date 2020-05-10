const { parseTokens, parseTypeKeyValue } = require('./tokens')

describe('tokens', () => {
  it('correctly parses tokens', () => {
    const result = parseTokens([
      'tokens Brand',
      'PrimaryColor color: #007BFF',
      'Logo image: branding/logo.svg',
    ])

    expect(result).toMatchObject({
      Brand: [
        {
          title: 'PrimaryColor',
          type: 'color',
          value: '#007BFF',
        },
        {
          title: 'Logo',
          type: 'image',
          value: 'branding/logo.svg',
        },
      ],
    })
  })

  it('correctly parses type key value', () => {
    const result = parseTypeKeyValue(' int HeaderHeight: 30')

    expect(result).toMatchObject({
      type: 'int',
      key: 'HeaderHeight',
      value: '30',
    })
  })
})
