const { parseComponentFile, parseTokenFile, parseProject } = require('./parsers')

const parser = {
  componentFile: parseComponentFile,
  tokenFile: parseTokenFile,
  project: parseProject,
}

module.exports = parser
