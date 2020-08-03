const { getFile, tokenizeFile } = require('./file')

const assignmentTypes = ['color', 'string', 'number', 'boolean', 'font', 'image']

/**
 * Evaluates statement tokens to assess whether they are of the following type:
 * name type : expression
 *
 * Example: primary color : #007BFF
 */
const isTypedAssignment = (tokens) => {
  if (tokens[2] !== ':') {
    return false
  }

  if (!assignmentTypes.includes(tokens[1])) {
    return false
  }

  return true
}

const parseBlock = (block, bundle) => {
  console.log('>')
  console.log(JSON.stringify(block))
  console.log('<')

  switch (block.tokens[0]) {
    case 'tokens':
      bundle.tokens = bundle.tokens || {
        map: {},
        list: [],
      }

      parseTokenBlock(block, bundle.tokens)
      break
    default:
      break
  }
}

const joinMultiLineExpression = (statements) => {
  return statements.map(({ tokens }) => tokens.join('')).join(' ')
}

const parseTokenBlock = (block, entity, name = '') => {
  const rootName = name ? `${name}.` : ''

  if (isTypedAssignment(block.tokens)) {
    const groups = name.split('.')
    const record = {
      id: `${rootName}${block.tokens[0]}`,
      group: groups[groups.length - 1],
      name: block.tokens[0],
      type: block.tokens[1],
      expression: block.children.length ? joinMultiLineExpression(block.children) : block.tokens[3],
    }

    entity.map[record.id] = record
    entity.list.push(record.id)
  } else {
    let childName
    if (block.tokens[1] === 'when') {
      childName = `${block.tokens[0]}.${block.tokens[2]}`
    } else {
      childName = `${rootName}${block.tokens[0]}`
    }

    block.children.forEach((childBlock) => {
      parseTokenBlock(childBlock, entity, childName)
    })
  }
}

module.exports = {
  getFile,
  tokenizeFile,
  parseBlock,
}

/*

block type
token type
component type
element type
option type
property type
value type

*/
