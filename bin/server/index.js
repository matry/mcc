const { spawn } = require('child_process')
const watcher = require('./watcher')
const { parse } = require('../parser')

const webpackDevServer = spawn('webpack-dev-server', ['--mode development'])

webpackDevServer.stdout.on('data', (data) => console.log(`stdout: ${data}`))
webpackDevServer.stderr.on('data', (data) => console.error(`stderr: ${data}`))
webpackDevServer.on('close', (code) => console.log(`child process exited with code ${code}`))

const watchProcess = watcher('src', () => {
  parse('src', 'bin/client')
})

process.on('SIGINT', () => {
  webpackDevServer.kill()
  watchProcess.close().then(() => {
    process.exit()
  })
})
