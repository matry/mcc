const { getFile, validateFileStructure } = require('./file')
const { captureBlock, captureBlocks } = require('./block')
const { parseHeader } = require('./header')
const { parseElements } = require('./elements')
const { parseStyles } = require('./styles')
const { parseOptions } = require('./options')
const { parseValues } = require('./values')

const parseComponentFile = (bundle, filePath) => {
  const result = {
    ...bundle,
  }
  const { lines, fileName } = getFile(filePath)

  validateFileStructure(lines)

  // Parse and append component
  const headerBlock = captureBlock(lines, 'component')
  result.components.map[fileName] = {
    name: fileName,
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

module.exports = {
  parseComponentFile,
}
