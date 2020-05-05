const { parseKeyValue } = require('./line')

const parseInputs = (inputGroups) => {
  const inputs = {
    public: [],
    private: [],
  }

  inputGroups.forEach((lines) => {
    const declaration = parseKeyValue(lines.shift())
    const inputType = declaration && declaration.value === 'private' ? 'private' : 'public'

    lines.forEach((line) => {
      const inputDatum = parseKeyValue(line)
      const inputValue = parseInputValue(inputDatum.value)

      inputs[inputType].push({
        title: inputDatum.key,
        ...inputValue,
      })
    })
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
    type: parts[0].trim(),
    defaultValue: defaultValue.trim(),
    options: options.length > 1 ? formattedOptions : [],
  }
}

module.exports = {
  parseInputs,
  parseInputValue,
}
