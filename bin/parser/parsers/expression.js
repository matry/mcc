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
    operation: OP_TYPES.assignment,
    value,
    leftOperand: null,
    operator: null,
    rightOperand: null,
  }

  if (typeof value !== 'string') {
    return result
  }

  result.operation = getOperation(value)

  switch (result.operation) {
    case OP_TYPES.assignment:
      break
    case OP_TYPES.math:
      break
    default:
      const operands = value.trim().split(' ')
      result.leftOperand = operands[0]
      result.operator = operands[1]
      result.rightOperand = operands[2]
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
