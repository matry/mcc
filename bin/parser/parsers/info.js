const { parseKeyValue } = require('./line')

const parseInfo = (lines) => {
  const info = {}

  lines.forEach((line) => {
    const infoDatum = parseKeyValue(line)

    if (infoDatum !== null) {
      info[infoDatum.key] = infoDatum.value
    }
  })

  return info
}

module.exports = {
  parseInfo,
}
