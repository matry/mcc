const operations = {
  assignment: 'assignment',
  reference: 'reference',
  layout: 'layout',
  color: 'color',
  math: 'math',
  percent: 'percent',
  boolean: 'boolean',
}

const computedValue = {
  key: 'abc',
  input: null,
  output: null,
  type: null,
  operation: null,
  leftOperand: null,
  operator: null,
  rightOperand: null,
}

const computedValues = (bundle, inputGraph) => {
  const result = {}

  bundle.tokens.list.forEach((tokenKey) => {
    const { input } = bundle.tokens.map[tokenKey]
    const key = `$tokens.${tokenKey}`

    result[key] = {
      key,
    }
  })
}

export default computedValues
