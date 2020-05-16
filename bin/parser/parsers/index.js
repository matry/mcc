const { getFile, validateFileStructure, writeJsonBundle } = require('./file')
const { captureBlock, captureBlocks } = require('./block')
const { getDirFiles } = require('./dir')
const { parseHeader } = require('./header')
const { parseElements } = require('./elements')
const { parseStyles } = require('./styles')
const { parseOptions } = require('./options')
const { parseTokens } = require('./tokens')
const { parseValues } = require('./values')

const parseTokenFile = (tokens, filePath) => {
  const { lines, fileName } = getFile(filePath)

  validateFileStructure(lines)

  const { map, list } = parseTokens(
    lines.filter((line) => line !== ''),
    fileName
  )

  return {
    map: {
      ...tokens.map,
      ...map,
    },
    list: [...tokens.list, ...list],
  }
}

const parseComponentFile = (bundle, filePath) => {
  const result = {
    ...bundle,
  }
  const { lines, fileName } = getFile(filePath)

  validateFileStructure(lines)

  // Parse and append component
  const headerBlock = captureBlock(lines, 'component')
  result.components.map[fileName] = {
    title: fileName,
    ...parseHeader(headerBlock),
  }
  result.components.list.push(fileName)

  // Parse and append elements
  const elements = parseElements(captureBlock(lines, 'elements'), fileName)
  result.elements = {
    map: {
      ...result.elements.map,
      ...elements.map,
    },
    list: [...result.elements.list, ...elements.list],
  }

  // Parse and append options
  const options = parseOptions(captureBlock(lines, 'options'), fileName)
  result.options = {
    map: {
      ...result.options.map,
      ...options.map,
    },
    list: [...result.options.list, ...options.list],
  }

  // Parse and append styles
  const styles = parseStyles(captureBlocks(lines, 'style'), fileName)
  result.styles = {
    map: {
      ...result.styles.map,
      ...styles.map,
    },
    list: [...result.styles.list, ...styles.list],
  }

  // Parse and append values
  const values = parseValues(captureBlocks(lines, 'values'), fileName)
  result.values = {
    map: {
      ...result.values.map,
      ...values.map,
    },
    list: [...result.values.list, ...values.list],
  }

  return result
}

const parseProject = (inputPath, outputPath) => {
  const tokenFilePaths = getDirFiles(inputPath, 'tokens')
  const componentFilePaths = getDirFiles(inputPath, 'components')

  let bundle = {
    tokens: {
      map: {},
      list: [],
    },
    components: {
      map: {},
      list: [],
    },
    elements: {
      map: {},
      list: [],
    },
    options: {
      map: {},
      list: [],
    },
    values: {
      map: {},
      list: [],
    },
    styles: {
      map: {},
      list: [],
    },
  }

  tokenFilePaths.forEach((tokenFilePath) => {
    bundle.tokens = parseTokenFile(bundle.tokens, tokenFilePath)
  })

  componentFilePaths.forEach((componentFilePath) => {
    bundle = parseComponentFile(bundle, componentFilePath)
  })

  // let components = {}
  // componentFilePaths.forEach((componentFilePath) => {
  //   components = {
  //     ...components,
  //     ...parseComponentFile(componentFilePath),
  //   }
  // })

  writeJsonBundle(outputPath, bundle)
}

module.exports = {
  parseComponentFile,
  parseTokenFile,
  parseProject,
}
