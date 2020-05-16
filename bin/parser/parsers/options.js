const { parseKeyValue } = require('./line')

const parseOptions = (optionsGroup, componentName) => {
  const map = {}
  const list = []

  optionsGroup.shift()

  optionsGroup.forEach((line) => {
    const optionDatum = parseKeyValue(line)
    const optionValue = parseOptionValue(optionDatum.value)

    const optionKey = `${componentName}.${optionDatum.key}`
    map[optionKey] = {
      title: optionDatum.key,
      ...optionValue,
    }
    list.push(optionKey)
  })

  return {
    map,
    list,
  }
}

const parseOptionValue = (line) => {
  const parts = line.trim().split(':')
  let defaultValue = parts[1]

  const options = parts[1].split(',')
  if (options.length > 1) {
    defaultValue = options.find((opt) => opt.includes('*')).replace('*', '')
  }

  const formattedOptions = options.map((opt) => {
    return opt.trim().replace('*', '')
  })

  return {
    type: parts[0].trim(),
    defaultValue: defaultValue.trim(),
    options: options.length > 1 ? formattedOptions : [],
  }
}

module.exports = {
  parseOptions,
  parseOptionValue,
}
