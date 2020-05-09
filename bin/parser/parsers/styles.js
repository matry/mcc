const { parseKeyValue } = require('./line')
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

const parseStyles = (styleGroups) => {
  const styles = {}

  styleGroups.forEach((styleGroup) => {
    const styleBlock = {
      contexts: [],
      rules: {},
    }
    let elementTarget = null

    styleGroup.forEach((line, index) => {
      const keyValue = parseKeyValue(line)

      if (index === 0) {
        const targetMatch = keyValue.value.split('when')
        elementTarget = targetMatch.shift().trim()
        styleBlock.contexts = targetMatch.map((m) => m.trim())
        return
      }

      const key = keyValue.key.replace(':', '')

      let value = keyValue.value
      if (!isNaN(Number(value))) {
        value = Number(value)
      }

      styleBlock.rules[key] = value
    })

    if (styleBlock.contexts.length === 0) {
      styleBlock.rules = setDefaults(styleBlock.rules)
    }

    styles[elementTarget] = styles[elementTarget] || []
    styles[elementTarget].push(styleBlock)
  })

  return styles
}

module.exports = {
  parseStyles,
}
