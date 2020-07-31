import React from 'react'
import { render } from 'react-dom'
import 'typeface-roboto'
import App from './components/App'
import './index.css'
import bundle from './bundle.json'

const denormalizeBundle = (bundle) => {
  const components = bundle.components.list.map((componentId) => {
    const component = bundle.components.map[componentId]

    const elements = bundle.elements.list.map((elementId) => {
      const element = bundle.elements.map[elementId]

      if (element.component !== componentId) {
        return null
      }

      const styles = {}

      bundle.styles.list.forEach((styleId) => {
        const style = bundle.styles.map[styleId]

        const styleElementKey = `${style.component}.${style.element}`

        if (styleElementKey !== elementId) {
          return
        }

        styles[style.context] = styles[style.context] || {}
        styles[style.context][style.property] = style.value
      })

      element.styles = styles

      return element
    })
    component.elements = elements.filter((element) => element !== null)

    const options = {}
    bundle.options.list.forEach((optionId) => {
      const option = bundle.options.map[optionId]

      if (option.component !== componentId) {
        return
      }

      options[option.name] = option.defaultValue
    })
    component.options = options

    return component
  })

  return components
}

const rootElement = document.getElementById('app')
render(<App bundle={denormalizeBundle(bundle)} />, rootElement)
