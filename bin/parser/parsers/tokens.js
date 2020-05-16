const parseTokens = (rawLines, category) => {
  const tokens = {}

  let lines = rawLines
  let tokenCategory = category

  if (!tokenCategory) {
    const parsed = getLines(rawLines)
    lines = parsed.lines
    tokenCategory = parsed.category
  }

  tokens[category] = []

  lines.forEach((line) => {
    const data = parseTypeKeyValue(line)

    if (!data) {
      return
    }

    tokens[category].push({
      title: data.key,
      type: data.type,
      value: data.value,
    })
  })

  return tokens
}

const getLines = (lines) => {
  const linesCopy = [...lines]
  const category = linesCopy.splice(0, 1)[0].trim().split(' ')[1].trim()

  return {
    category,
    lines: linesCopy,
  }
}

const parseTypeKeyValue = (line) => {
  const parts = line.trim().split(':')

  if (parts.length < 2) {
    return null
  }

  const [key, type] = parts[0].trim().split(' ')

  return {
    type: type.trim(),
    key: key.trim(),
    value: parts[1].trim(),
  }
}

module.exports = {
  parseTokens,
  parseTypeKeyValue,
}
