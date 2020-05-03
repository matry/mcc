const fs = require('fs')
const path = require('path')

const parseError = new Error('Error parsing component file')

const validateFileStructure = (lines) => {
  if (lines[0] !== '' || lines[lines.length - 1] !== '') {
    throw parseError
  }
}

const getFile = (filePath) => {
  return {
    lines: fs.readFileSync(filePath, 'utf8').split(/\r?\n/),
    fileName: path.basename(filePath).split('.')[0],
  }
}

const writeJsonBundle = (filePath, jsonData) => {
  fs.writeFileSync(`${filePath}/bundle.json`, JSON.stringify(jsonData), { flag: 'w' })
}

module.exports = {
  validateFileStructure,
  getFile,
  writeJsonBundle,
}
