const { getDirFiles } = require('./parsers/dir')
const { writeJsonBundle } = require('./parsers/file')
const { getFile, tokenizeFile, parseBlock } = require('./parsers')

const parse = (inputPath, outputPath) => {
  let bundle = {}

  const filePaths = getDirFiles(inputPath)

  filePaths.forEach((filePath) => {
    const lines = getFile(filePath)
    const blocks = tokenizeFile(lines)

    blocks.forEach((block) => {
      parseBlock(block, bundle)
    })
  })

  writeJsonBundle(outputPath, bundle)
}

module.exports = {
  parse,
}
