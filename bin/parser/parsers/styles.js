const { parseKeyValue } = require('./line')
const { parseExpression } = require('./expression')
const defaultStyles = require('./defaultStyles')

const toCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
const toHyphen = (str) => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)

const setDefaults = (styles) => {
  const result = {}

  Object.keys(defaultStyles).forEach((key) => {
    const hyphenKey = toHyphen(key)
    if (styles.hasOwnProperty(hyphenKey)) {
      result[key] = styles[hyphenKey]
    } else {
      result[key] = defaultStyles[key]
    }
  })

  return result
}

const parseStyles = (styleGroups, componentName) => {
  const map = {}
  const list = []

  styleGroups.forEach((styleGroup) => {
    let elementTarget = null
    let contextTarget = 'root'

    styleGroup.forEach((line, index) => {
      const keyValue = parseKeyValue(line)

      if (index === 0) {
        const targetMatch = keyValue.value.split('when')
        elementTarget = targetMatch[0].trim()
        contextTarget = targetMatch[1] ? targetMatch[1].trim() : contextTarget
        return
      }

      const key = keyValue.key.replace(':', '')

      let value = keyValue.value
      if (!isNaN(Number(value))) {
        value = Number(value)
      }

      const styleKey = `${componentName}.${elementTarget}.${contextTarget}.${key}`

      map[styleKey] = {
        component: componentName,
        element: elementTarget,
        context: contextTarget,
        property: key,
        ...parseExpression(value),
      }
      list.push(styleKey)
    })
  })

  return {
    map,
    list,
  }
}

module.exports = {
  parseStyles,
}
