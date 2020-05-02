const parseKeyValue = (line) => {
  const trimmedLine = line.trim()
  const parts = trimmedLine.split(' ')

  if (parts.length === 1) {
    return null
  }

  const key = parts[0]
  const value = parts.slice(parts.findIndex((line, index) => line !== '' && index !== 0)).join(' ')

  return {
    key,
    value,
  }
}

module.exports = {
  parseKeyValue,
}
