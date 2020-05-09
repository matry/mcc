const { parseKeyValue } = require('./line')

const parseValues = (valuesGroup) => {
  const values = []

  valuesGroup.shift()

  valuesGroup.forEach((line) => {
    const valueDatum = parseKeyValue(line)
    const valueValue = parseValueValue(valueDatum.value)

    values.push({
      title: valueDatum.key,
      ...valueValue,
    })
  })

  return values
}

const parseValueValue = (line) => {
  const parts = line.trim().split(':')
  return {
    type: parts[0].trim(),
    value: parts[1].trim(),
  }
}

module.exports = {
  parseValues,
  parseValueValue,
}
