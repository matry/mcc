const parseTokens = (lines, key) => {
  const map = {}
  const list = []

  // let lines = rawLines
  // if (!tokenCategory) {
  //   const parsed = getLines(rawLines)
  //   lines = parsed.lines
  //   tokenCategory = parsed.category
  // }

  lines.forEach((line) => {
    const data = parseTypeKeyValue(line)

    if (!data) {
      return
    }

    const tokenKey = `${key}.${data.key}`

    map[tokenKey] = {
      title: data.key,
      type: data.type,
      value: data.value,
    }

    list.push(tokenKey)
  })

  return {
    map,
    list,
  }
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
