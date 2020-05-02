const { parseKeyValue } = require('./line')

const parseInputs = (lines) => {
  const inputs = {
    map: {},
    list: [],
  }

  lines.forEach((line) => {
    const inputDatum = parseKeyValue(line)

    if (inputDatum === null) {
      return
    }

    const inputValue = parseInputValue(inputDatum.value)

    inputs.map[inputValue.title] = {
      ...inputValue,
      type: inputDatum.key,
    }
    inputs.list.push(inputValue.title)
  })

  return inputs
}

const parseInputValue = (line) => {
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
    title: parts[0].trim(),
    defaultValue: defaultValue.trim(),
    options: options.length > 1 ? formattedOptions : [],
  }
}

module.exports = {
  parseInputs,
  parseInputValue,
}
