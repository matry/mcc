const captureBlock = (lines, keyword) => {
  const startIndex = lines.findIndex((line) => line.trim().split(' ')[0] === keyword)

  let i = startIndex
  do {
    i += 1
  } while (lines[i].trim() !== '')

  const endIndex = i

  if (endIndex - startIndex <= 1) {
    return []
  }

  return lines.slice(startIndex, endIndex)
}

const captureBlocks = (lines, keyword, blocks = []) => {
  const startIndex = lines.findIndex((line) => line.trim().split(' ')[0] === keyword)

  if (startIndex === -1) {
    return blocks
  }

  let i = startIndex
  do {
    i += 1
  } while (lines[i] !== undefined && lines[i].trim() !== '')

  const endIndex = i

  if (endIndex - startIndex <= 1) {
    return blocks
  }

  const linesCopy = [...lines]
  blocks.push(linesCopy.splice(startIndex, endIndex - startIndex))

  return captureBlocks(linesCopy, keyword, blocks)
}

module.exports = {
  captureBlock,
  captureBlocks,
}
