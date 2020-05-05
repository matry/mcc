const { parseHeader } = require('./header')

describe('header', () => {
  it('correctly parses a component header line', () => {
    const header = parseHeader([
      'component ThisisATitle',
      ' desc  some description',
      'title ThisIsATitle',
    ])

    expect(header).toMatchObject({
      desc: 'some description',
      title: 'ThisIsATitle',
    })
  })
})
