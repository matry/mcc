const { parseKeyValue } = require('./line')

const parseElements = (lines, componentName) => {
  const map = {}
  const list = []

  let previousLineIndentation = 0
  let parents = [null]
  lines.forEach((line) => {
    const elementDatum = parseKeyValue(line)

    if (elementDatum === null) {
      return
    }

    const currentLineIndentation = line.search(/\S|$/)

    if (currentLineIndentation > previousLineIndentation) {
      const parentKey = list[list.length - 1]
      const parentElement = map[parentKey]
      if (parentElement) {
        if (parentElement.type !== 'boundary') {
          throw new Error(
            `Invalid syntax: unable to nest element ${elementDatum.key} inside a ${parentElement.type}`
          )
        }

        parents.push(parentKey)
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

    const elementKey = `${componentName}.${elementDatum.key}`
    map[elementKey] = element
    list.push(elementKey)
  })

  return {
    map,
    list,
  }
}

module.exports = {
  parseElements,
}
