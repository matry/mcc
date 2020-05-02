const { validateFileStructure } = require('./file')

describe('files', () => {
  it('succeeds with correct file structure', () => {
    const fn = jest.fn(() => {
      validateFileStructure(['', 'some code', 'some more code', ''])
    })
    fn()
    expect(fn).toHaveReturned()
  })

  it('fails with incorrect file structure', () => {
    const fn = jest.fn(() => {
      validateFileStructure(['some code', 'some more code'])
    })
    expect(fn).toThrow()
  })
})
