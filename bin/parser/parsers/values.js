const { parseExpression } = require('./expression')
const { parseKeyValue } = require('./line')

const parseValues = (valueGroups, componentName) => {
  const map = {}
  const list = []

  valueGroups.forEach((valueGroup) => {
    let contextTarget = null

    valueGroup.forEach((line, index) => {
      let keyValue = contextTarget ? parseContextLine(line) : parseKeyValue(line)

      if (keyValue === null) {
        return
      }

      if (index === 0) {
        const targetMatch = keyValue.value.split('when').map((c) => c.trim())

        if (targetMatch.length > 1) {
          contextTarget = targetMatch[1]
        }
        return
      }

      const entryKey = `${componentName}.${contextTarget || 'root'}.${keyValue.key}`
      const rootValue = map[`${componentName}.root.${keyValue.key}`]

      if (rootValue) {
        map[entryKey] = {
          name: keyValue.key,
          type: rootValue.type,
          ...parseContextValue(keyValue.value),
        }
      } else {
        map[entryKey] = {
          name: keyValue.key,
          ...parseValue(keyValue.value),
        }
      }

      list.push(entryKey)
    })
  })

  return {
    map,
    list,
  }
}

const parseContextLine = (line) => {
  const parts = line.trim().split(':')
  return {
    key: parts[0].trim(),
    value: parts[1].trim(),
  }
}

const parseContextValue = (value) => {
  return parseExpression(value)
}

const parseValue = (line) => {
  const parts = line.trim().split(':')
  const value = parts[1].trim()
  return {
    type: parts[0].trim(),
    value,
    ...parseExpression(value),
  }
}

module.exports = {
  parseValues,
  parseValue,
}
