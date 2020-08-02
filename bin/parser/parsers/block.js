/**
 * A "Block" in Matry is a related collection of statements that work together to define
 * some aspect of a Matry project.
 *
 * All blocks are composed of the following pieces:
 * 1. A header, always defined by the block keyword, and sometimes with additional descriptors
 * 2. A body, composed of individual statements collected underneath the header
 * 3. Some blocks allow nesting statements, where one statement may have a parent, a sibling, or a child.
 */

/**
 *
 * @param {Array} lines : The text lines of the files
 * @param {String} keyword : The syntax keyword that defines the block header
 */
const captureIndices = (lines, keyword) => {
  const start = lines.findIndex((line) => line.trim().split(' ')[0] === keyword)

  let i = start
  do {
    i += 1
  } while (lines[i].trim() !== '')

  const end = i

  if (end - start <= 1) {
    return null
  }

  return {
    start,
    end,
  }
}

const indentation = (line) => {
  return line.search(/\S|$/)
}

const captureSmartBlock = (lines, keyword) => {
  const indices = captureIndices(lines, keyword)

  if (!indices) {
    return null
  }

  const bodyLines = lines.slice(indices.start, indices.end)
  const header = bodyLines.shift()

  const body = []

  let referenceIndentation = indentation(bodyLines[0])
  let parentIndices = []

  bodyLines.forEach((bodyLine, index) => {
    const currentIndentation = indentation(bodyLine)
    if (currentIndentation > referenceIndentation) {
      referenceIndentation = currentIndentation
      parentIndices.push(index)
    } else if (currentIndentation < referenceIndentation) {
      referenceIndentation = currentIndentation
      parentIndices.pop()
    }

    body.push({
      parentIndex: parentIndices.length ? parentIndices[parentIndices.length - 1] : null,
      content: bodyLine,
    })
  })

  return {
    header,
    body,
  }
}

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
  captureSmartBlock,
}
