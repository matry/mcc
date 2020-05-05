const { parseKeyValue } = require('./line')

const parseHeader = (lines) => {
  const header = {}

  lines.forEach((line) => {
    const headerDatum = parseKeyValue(line)

    if (headerDatum !== null) {
      const key = headerDatum.key === 'component' ? 'title' : headerDatum.key
      header[key] = headerDatum.value
    }
  })

  return header
}

module.exports = {
  parseHeader,
}
