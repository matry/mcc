const watch = require('node-watch')

const watcher = srcDir => {
  watch(srcDir, { recursive: true }, (event, name) => {
    console.log(event)
    console.log(name)
  })
}

module.exports = watcher
