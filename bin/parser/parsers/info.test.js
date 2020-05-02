const { parseInfo } = require('./info')

describe('info', () => {
  it('correctly parses an info line', () => {
    const info = parseInfo([' desc  some description', 'title ThisIsATitle'])

    expect(info).toMatchObject({
      desc: 'some description',
      title: 'ThisIsATitle',
    })
  })
})
