const { spawn } = require('child_process')
const watcher = require('./watcher')
const { project } = require('../parser')

const webpackDevServer = spawn('webpack-dev-server', ['--mode development'])

webpackDevServer.stdout.on('data', (data) => console.log(`stdout: ${data}`))
webpackDevServer.stderr.on('data', (data) => console.error(`stderr: ${data}`))
webpackDevServer.on('close', (code) => console.log(`child process exited with code ${code}`))

watcher('src', () => {
  project('src', 'bin/client')
})
