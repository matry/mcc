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
        parents.push(parentKey)
      }
      previousLineIndentation = currentLineIndentation
    } else if (currentLineIndentation < previousLineIndentation) {
      previousLineIndentation = currentLineIndentation
      parents.pop()
    }

    let type = elementDatum.value
    let ref = null
    let multi = false

    if (type.includes('instance')) {
      ref = type.split(':')[1].trim()
      type = 'instance'
    }

    let title = elementDatum.key

    if (title.includes('...')) {
      title = title.replace('...', '')
      multi = true
    }

    const elementKey = `${componentName}.${title}`

    const element = {
      key: elementKey,
      component: componentName,
      title,
      type,
      ref,
      multi,
      parent: parents[parents.length - 1],
    }

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
