const { getFile, validateFileStructure } = require('./file')

const parseTokenFile = (tokens, filePath) => {
  const { lines, fileName } = getFile(filePath)

  validateFileStructure(lines)

  const { map, list } = parseTokens(
    lines.filter((line) => line !== ''),
    fileName
  )

  return {
    map: {
      ...tokens.map,
      ...map,
    },
    list: [...tokens.list, ...list],
  }
}

const parseTokens = (lines, key) => {
  const map = {}
  const list = []

  lines.forEach((line) => {
    const data = parseTypeKeyValue(line)

    if (!data) {
      return
    }

    const tokenKey = `${key}.${data.key}`

    map[tokenKey] = {
      name: data.key,
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
  parseTokenFile,
  parseTypeKeyValue,
}
