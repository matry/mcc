const { writeJsonBundle } = require('./file')
const { getDirFiles } = require('./dir')
const { parseTokenFile } = require('./tokens')
const { parseComponentFile } = require('./components')

const parseProject = (inputPath, outputPath) => {
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
  parseComponentFile,
  parseTokenFile,
  parseProject,
}
