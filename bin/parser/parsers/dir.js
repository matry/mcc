const fs = require('fs')
const path = require('path')

const getDirFiles = (dirPath, subPath, arrayOfFiles = []) => {
  const fullPath = path.join(dirPath, subPath)

  fs.readdirSync(fullPath).forEach((file) => {
    if (fs.statSync(fullPath + '/' + file).isDirectory()) {
      arrayOfFiles = getDirFiles(fullPath + '/' + file, arrayOfFiles)
      return
    }

    // Exclude system files
    if (file[0] === '.') {
      return
    }

    arrayOfFiles.push(path.join(fullPath, '/', file))
  })

  return arrayOfFiles
}

module.exports = {
  getDirFiles,
}
