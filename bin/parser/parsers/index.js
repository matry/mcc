const { getFile, validateFileStructure, writeJsonBundle } = require('./file')
const { captureBlock, captureBlocks } = require('./block')
const { getDirFiles } = require('./dir')
const { parseInfo } = require('./info')
const { parseElements } = require('./elements')
const { parseStyles } = require('./styles')
const { parseInputs } = require('./inputs')
const { parseTokens } = require('./tokens')

const parseTokenFile = (filePath) => {
  const { lines, fileName } = getFile(filePath)

  validateFileStructure(lines)

  const tokenBlocks = captureBlocks(lines, 'tokens')

  let result = {}

  if (tokenBlocks.length === 0) {
    result[fileName] = parseTokens(lines.filter((line) => line !== ''))
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

  const infoBlock = captureBlock(lines, 'info')
  const elementsBlock = captureBlock(lines, 'elements')
  const styleBlocks = captureBlocks(lines, 'style')
  const inputsBlock = captureBlock(lines, 'inputs')

  const component = {}

  component[fileName] = {
    info: parseInfo(infoBlock),
    elements: parseElements(elementsBlock),
    styles: parseStyles(styleBlocks),
    inputs: parseInputs(inputsBlock),
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
