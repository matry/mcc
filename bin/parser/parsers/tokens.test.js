const { parseTokens, parseTypeKeyValue } = require('./tokens')

describe('tokens', () => {
  it('correctly parses tokens', () => {
    const result = parseTokens(
      ['PrimaryColor color: #007BFF', 'Logo image: branding/logo.svg'],
      'Brand'
    )

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
    const result = parseTypeKeyValue(' HeaderHeight integer: 30')

    expect(result).toMatchObject({
      type: 'integer',
      key: 'HeaderHeight',
      value: '30',
    })
  })
})
