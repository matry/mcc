const { parseKeyValue } = require('./line')
const defaultStyles = require('./defaultStyles')

const toCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())

const setDefaults = (styles) => {
  const result = {}

  Object.keys(defaultStyles).forEach((key) => {
    const camelCaseKey = toCamelCase(key)

    if (styles.hasOwnProperty(key)) {
      result[camelCaseKey] = styles[key]
    } else {
      result[camelCaseKey] = defaultStyles[camelCaseKey]
    }
  })

  return result
}

const parseStyles = (styleGroups) => {
  const styles = {}

  styleGroups.forEach((styleGroup) => {
    let elementTarget = null
    let contextTarget = null

    styleGroup.forEach((line) => {
      const keyValue = parseKeyValue(line)

      if (keyValue.key === 'style') {
        const declarationParts = keyValue.value.split('.')
        elementTarget = declarationParts[0]
        contextTarget = declarationParts[1] || '_default'

        if (elementTarget) {
          styles[elementTarget] = styles[elementTarget] || {
            _default: {},
          }
        }

        styles[elementTarget][contextTarget] = styles[elementTarget][contextTarget] || {}

        return
      }

      if (elementTarget === null) {
        return
      }

      const key = keyValue.key.replace(':', '')

      let value = keyValue.value
      if (!isNaN(Number(value))) {
        value = Number(value)
      }

      styles[elementTarget][contextTarget][key] = value
    })

    if (contextTarget === '_default') {
      styles[elementTarget][contextTarget] = setDefaults(styles[elementTarget][contextTarget])
    }
  })

  return styles
}

module.exports = {
  parseStyles,
}
