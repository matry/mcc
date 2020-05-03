const { parseKeyValue } = require('./line')

const parseElements = (lines) => {
  const elements = {
    map: {},
    list: [],
  }

  lines.forEach((line) => {
    const elementDatum = parseKeyValue(line)

    if (elementDatum === null) {
      return
    }

    const element = {
      type: elementDatum.key.replace(':', ''),
      title: elementDatum.value,
    }

    elements.map[element.title] = element
    elements.list.push(element.title)
  })

  return elements
}

module.exports = {
  parseElements,
}
