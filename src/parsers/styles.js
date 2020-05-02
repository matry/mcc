const { parseKeyValue } = require('./line')

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
        contextTarget = declarationParts[1] || null

        if (elementTarget) {
          styles[elementTarget] = styles[elementTarget] || []
        }

        return
      }

      if (elementTarget === null) {
        return
      }

      styles[elementTarget].push({
        element: elementTarget,
        context: contextTarget,
        key: keyValue.key.replace(':', ''),
        value: keyValue.value,
      })
    })
  })

  return styles
}

module.exports = {
  parseStyles,
}
