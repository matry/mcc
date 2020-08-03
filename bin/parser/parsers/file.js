const fs = require('fs')

const indentation = (line) => {
  return line.search(/\S|$/)
}

const strip = (line) => {
  return line
    .trim()
    .split(' ')
    .filter((part) => part !== '')
}

const getFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8').split(/\r?\n/)
}

const replaceMany = (str, mapObj) => {
  const regEx = new RegExp(Object.keys(mapObj).join('|'), 'gi')
  return str.replace(regEx, (matched) => mapObj[matched.toLowerCase()])
}

const writeJsonBundle = (filePath, jsonData) => {
  fs.writeFileSync(`${filePath}/bundle.json`, JSON.stringify(jsonData), { flag: 'w' })
}

const tokenizeBlock = (lines) => {
  const statements = []

  for (let i = 0, l = lines.length; i < l; i++) {
    const line = lines[i]
    const statement = {
      indentation: indentation(line),
      tokens: strip(line),
      children: [],
    }

    if (i === 0) {
      statements.push(statement)
      continue
    }

    const prevStatement = statements[i - 1]

    if (statement.indentation > prevStatement.indentation) {
      statements[i - 1].children = tokenizeBlock(lines.slice(i))
      return statements
    }

    statements.push(statement)
  }

  return statements
}

const getRootBlocks = (lines) => {
  const blocks = []

  let block = null

  lines.forEach((line) => {
    if (line === '') {
      return
    }

    if (indentation(line) === 0) {
      if (block) {
        blocks.push(block)
      }

      block = []
    }

    // This should never happen.
    if (!block) {
      return
    }

    block.push(line)
  })

  if (block) {
    blocks.push(block)
  }

  return blocks
}

const tokenizeFile = (lines) => {
  const blocks = getRootBlocks(
    lines.map((line) => {
      return replaceMany(line, {
        ':': ' : ',
        '{': '',
        '}': '',
      })
    })
  )

  return blocks.map((block) => tokenizeBlock(block)[0])
}

module.exports = {
  getFile,
  writeJsonBundle,
  tokenizeFile,
}
