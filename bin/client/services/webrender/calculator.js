/*

CALCULATOR
- feedKeys
- feedAssignments
- calculateValues
- updateAssignments

*/

class Calculator {
  constructor() {
    this.expressions = {}
    this.values = {}
  }

  feedExpressions(expressions) {
    Object.entries(expressions).forEach(([key, body]) => {
      this.expressions[key] = {
        body,
      }
    })
  }

  calculateValues() {
    Object.keys(this.values).forEach((key) => {
      this.values[key] = null
    })
  }
}
