const { getDirFiles } = require('./parsers/dir')
const { writeJsonBundle } = require('./parsers/file')
const { parseComponentFile, parseTokenFile } = require('./parsers')

const parse = (inputPath, outputPath) => {
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
    mocks: {
      map: {},
      list: [],
    },
  }

  const tokenFilePaths = getDirFiles(inputPath, 'tokens')
  tokenFilePaths.forEach((tokenFilePath) => {
    bundle.tokens = parseTokenFile(bundle.tokens, tokenFilePath)
  })

  const componentFilePaths = getDirFiles(inputPath, 'components')
  componentFilePaths.forEach((componentFilePath) => {
    bundle = parseComponentFile(bundle, componentFilePath)
  })

  writeJsonBundle(outputPath, bundle)
}

module.exports = {
  parse,
}
