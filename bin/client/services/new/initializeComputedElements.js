import elementTypes from './elementTypes'

const getElements = (bundle, componentName) => {
  const result = {
    map: {},
    list: [],
  }

  bundle.elements.list.forEach((id) => {
    const entity = bundle.elements.map[id]
    if (entity.component === componentName) {
      result.map[id] = entity
      result.list.push(id)
    }
  })

  return result
}

const getStyles = (bundle, elementId) => {
  const element = bundle.elements.map[elementId]

  const result = {
    map: {},
    list: [],
  }

  bundle.styles.list.forEach((id) => {
    const entity = bundle.styles.map[id]

    if (entity.component === element.component && entity.element === element.title) {
      result.map[id] = entity
      result.list.push(id)
    }
  })

  return result
}

const createComputedElement = (id, parent, type) => {
  return {
    ID: id,
    PARENT_ID: parent,
    TYPE: type,
    FILL_COLOR: null,
    STROKE_COLOR: null,
    STROKE_WIDTH: null,
    STROKE_ALIGN: null,
    WIDTH: null,
    HEIGHT: null,
    TOP_TOP: null,
    TOP_BOTTOM: null,
    LEFT_LEFT: null,
    LEFT_RIGHT: null,
    RIGHT_LEFT: null,
    RIGHT_RIGHT: null,
    BOTTOM_TOP: null,
    BOTTOM_BOTTOM: null,
    CENTER_X_LEFT: null,
    CENTER_X_RIGHT: null,
    CENTER_Y_TOP: null,
    CENTER_Y_BOTTOM: null,
    TEXT_ALIGN_Y: null,
    TEXT_ALIGN_X: null,
    TEXT_HEIGHT: null,
    COMPUTED_TEXT_HEIGHT: null,
    FONT_SIZE: null,
    FONT_WEIGHT: null,
    FONT_FAMILY: null,
    COMPUTED_LINES: null,
    CONTENT: null,
  }
}

const initializeComputedElement = (bundle, elementId, input) => {
  const styles = getStyles(bundle, elementId)
  const computedElement = {
    ID: 'a',
    PARENT_ID: null,
    TYPE: 'shape',
    input: {},
    output: {
      FILL_COLOR: '#007BFF',
      STROKE_COLOR: null,
      STROKE_WIDTH: null,
      STROKE_ALIGN: null,
      WIDTH: 200,
      HEIGHT: 200,
      TOP_TOP: 200,
      TOP_BOTTOM: 600,
      LEFT_LEFT: 200,
      LEFT_RIGHT: 800,
      RIGHT_LEFT: 400,
      RIGHT_RIGHT: 600,
      BOTTOM_TOP: 400,
      BOTTOM_BOTTOM: 400,
      CENTER_X_LEFT: 300,
      CENTER_X_RIGHT: 500,
      CENTER_Y_TOP: 300,
      CENTER_Y_BOTTOM: 500,
      TEXT_ALIGN_Y: null,
      TEXT_ALIGN_X: null,
      TEXT_HEIGHT: null,
      COMPUTED_TEXT_HEIGHT: null,
      FONT_SIZE: null,
      FONT_WEIGHT: null,
      FONT_FAMILY: null,
      COMPUTED_LINES: [],
      CONTENT: null,
    },
  }

  styles.list.forEach((id) => {})
}

const initializeComputedElements = (bundle, componentName, inputGraph) => {
  const elements = getElements(bundle, componentName)
  const computedElements = [createComputedElement('root', null, 'boundary')]

  Object.entries(inputGraph).forEach(([elementId, input]) => {
    const id = `${componentName}.${elementId}`
    const element = elements.map[id]

    if (!element) {
      return
    }

    if (Array.isArray(input)) {
      if (element.type !== elementTypes.instance) {
        return
      }

      if (!element.ref) {
        return
      }

      if (!element.multi) {
        return
      }
    }
  })
}

export default initializeComputedElements
