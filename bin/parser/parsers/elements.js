const { parseKeyValue } = require('./line')

const parseElements = (lines) => {
  const elements = []

  lines.forEach((line) => {
    const elementDatum = parseKeyValue(line)

    if (elementDatum === null) {
      return
    }

    const element = {
      type: elementDatum.key.replace(':', ''),
      title: elementDatum.value,
    }

    elements.push(element)
  })

  return elements
}

module.exports = {
  parseElements,
}
