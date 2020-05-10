const { getFile, validateFileStructure, writeJsonBundle } = require('./file')
const { captureBlock, captureBlocks } = require('./block')
const { getDirFiles } = require('./dir')
const { parseHeader } = require('./header')
const { parseElements } = require('./elements')
const { parseStyles } = require('./styles')
const { parseOptions } = require('./options')
const { parseTokens } = require('./tokens')
const { parseValues } = require('./values')

const parseTokenFile = (filePath) => {
  const { lines, fileName } = getFile(filePath)

  validateFileStructure(lines)

  const tokenBlocks = captureBlocks(lines, 'tokens')

  let result = {}

  if (tokenBlocks.length === 0) {
    result = parseTokens(
      lines.filter((line) => line !== ''),
      fileName
    )
  } else {
    tokenBlocks.forEach((tokenBlock) => {
      const parsedTokenBlock = parseTokens(tokenBlock)

      result = {
        ...result,
        ...parsedTokenBlock,
      }
    })
  }

  return result
}

const parseComponentFile = (filePath) => {
  const { lines, fileName } = getFile(filePath)

  validateFileStructure(lines)

  const headerBlock = captureBlock(lines, 'component')
  const elementsBlock = captureBlock(lines, 'elements')
  const optionsBlock = captureBlock(lines, 'options')
  const styleBlocks = captureBlocks(lines, 'style')
  const valueBlocks = captureBlocks(lines, 'values')

  const component = {}

  component[fileName] = {
    header: parseHeader(headerBlock),
    elements: parseElements(elementsBlock),
    options: parseOptions(optionsBlock),
    values: parseValues(valueBlocks),
    styles: parseStyles(styleBlocks),
  }

  return component
}

const parseProject = (inputPath, outputPath) => {
  const tokenFilePaths = getDirFiles(inputPath, 'tokens')
  const componentFilePaths = getDirFiles(inputPath, 'components')

  let tokens = {}
  tokenFilePaths.forEach((tokenFilePath) => {
    tokens = {
      ...tokens,
      ...parseTokenFile(tokenFilePath),
    }
  })

  let components = {}
  componentFilePaths.forEach((componentFilePath) => {
    components = {
      ...components,
      ...parseComponentFile(componentFilePath),
    }
  })

  writeJsonBundle(outputPath, {
    tokens,
    components,
  })
}

module.exports = {
  parseComponentFile,
  parseTokenFile,
  parseProject,
}
