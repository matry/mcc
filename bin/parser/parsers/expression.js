const OP_TYPES = {
  assignment: 'assignment',
  layout: 'layout',
  color: 'color',
  math: 'math',
  percent: 'percent',
  boolean: 'boolean',
}

const parseExpression = (value) => {
  const result = {
    type: OP_TYPES.assignment,
    value,
    operands: {
      left: null,
      operator: null,
      right: null,
    },
  }

  if (typeof value !== 'string') {
    return result
  }

  result.type = getOperation(value)

  switch (result.type) {
    case OP_TYPES.assignment:
      break
    case OP_TYPES.math:
      break
    default:
      const operands = value.trim().split(' ')
      result.operands.left = operands[0]
      result.operands.operator = operands[1]
      result.operands.right = operands[2]
      break
  }

  return result
}

const getOperation = (expression) => {
  if (isLayoutOperation(expression)) {
    return OP_TYPES.layout
  }

  if (isColorExpression(expression)) {
    return OP_TYPES.color
  }

  if (isPercentExpression(expression)) {
    return OP_TYPES.percent
  }

  if (isBooleanExpression(expression)) {
    return OP_TYPES.boolean
  }

  if (isMathExpression(expression)) {
    return OP_TYPES.math
  }

  return OP_TYPES.assignment
}

const isLayoutOperation = (expression) => {
  return (
    expression.includes('from') || expression.includes('padding') || expression.includes('margin')
  )
}

const isColorExpression = (expression) => {
  return (
    expression.includes('value') ||
    expression.includes('hue') ||
    expression.includes('saturate') ||
    expression.includes('darken') ||
    expression.includes('lighten') ||
    expression.includes('desaturate')
  )
}

const isMathExpression = (expression) => {
  return (
    expression.includes('(') ||
    expression.includes(')') ||
    expression.includes('+') ||
    expression.includes('-') ||
    expression.includes('/') ||
    expression.includes('*')
  )
}

const isPercentExpression = (expression) => {
  return expression.includes('of')
}

const isBooleanExpression = (expression) => {
  return expression.includes('>=') || expression.includes('<=') || expression.includes('=')
}

module.exports = {
  parseExpression,
}
