const chokidar = require('chokidar')

const watcher = (srcDir, callback) => {
  const watchProcess = chokidar.watch(srcDir)
  watchProcess.on('all', callback)

  return watchProcess
}

module.exports = watcher
