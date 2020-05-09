const { parseKeyValue } = require('./line')

const parseElements = (lines) => {
  const elements = []

  let previousLineIndentation = 0
  let parents = [null]
  lines.forEach((line) => {
    const elementDatum = parseKeyValue(line)

    if (elementDatum === null) {
      return
    }

    const currentLineIndentation = line.search(/\S|$/)

    if (currentLineIndentation > previousLineIndentation) {
      const parentElement = elements[elements.length - 1]
      if (parentElement) {
        if (parentElement.type !== 'boundary') {
          throw new Error(
            `Invalid syntax: unable to nest element ${elementDatum.key} inside a ${parentElement.type}`
          )
        }

        parents.push(parentElement.title)
      }
      previousLineIndentation = currentLineIndentation
    } else if (currentLineIndentation < previousLineIndentation) {
      previousLineIndentation = currentLineIndentation
      parents.pop()
    }

    const element = {
      title: elementDatum.key,
      type: elementDatum.value,
      parent: parents[parents.length - 1],
    }

    elements.push(element)
  })

  return elements
}

module.exports = {
  parseElements,
}
