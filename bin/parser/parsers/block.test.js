const { captureBlock, captureBlocks } = require('./block')

describe('blocks', () => {
  test('captures correct number of lines for 1 block', () => {
    const lines = ['', ' ABC', 'some text', 'some other random text', '', 'and something else']

    const block = captureBlock(lines, 'ABC')
    expect(block).toHaveLength(3)
  })

  test('handles no lines available', () => {
    const lines = ['', 'some text', 'some other text']

    const block = captureBlock(lines, 'ABC') // does not exist in array

    expect(block).toHaveLength(0)
  })

  test('captures correct number of blocks when 1 available', () => {
    const lines = ['', 'ABC', 'some', 'text', '']

    const blocks = captureBlocks(lines, 'ABC')
    expect(blocks).toHaveLength(1)
  })

  test('captures correct number of blocks when multiple available', () => {
    const blocks = captureBlocks(
      ['', 'ABC', 'some', 'text', '', '', 'ABC', 'and', 'some', 'more'],
      'ABC'
    )
    expect(blocks).toHaveLength(2)
  })
})
