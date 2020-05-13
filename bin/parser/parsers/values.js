const { parseExpression } = require('./expression')
const { parseKeyValue } = require('./line')

const parseValues = (valueGroups) => {
  const values = []

  valueGroups.forEach((valueGroup) => {
    const valueBlock = {
      contexts: [],
      values: {},
    }

    valueGroup.forEach((line, index) => {
      let keyValue

      if (valueBlock.contexts.length) {
        keyValue = parseContextValue(line)
      } else {
        keyValue = parseKeyValue(line)
      }

      if (keyValue === null) {
        return
      }

      if (index === 0) {
        valueBlock.contexts = keyValue.value
          .split('when')
          .slice(1)
          .map((c) => c.trim())
          .filter((c) => c !== 'and')
        return
      }

      if (valueBlock.contexts.length) {
        valueBlock.values[keyValue.title] = keyValue
      } else {
        valueBlock.values[keyValue.key] = {
          title: keyValue.key,
          ...parseValue(keyValue.value),
        }
      }
    })

    values.push(valueBlock)
  })

  return values
}

const parseContextValue = (line) => {
  const parts = line.trim().split(':')
  return {
    title: parts[0].trim(),
    value: parts[1].trim(),
  }
}

const parseValue = (line) => {
  const parts = line.trim().split(':')
  return {
    type: parts[0].trim(),
    value: parseExpression(parts[1].trim()),
  }
}

module.exports = {
  parseValues,
  parseValue,
}
