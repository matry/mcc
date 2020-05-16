import { getBoundary } from './boundary'
import { resolveConstraints } from './constraints'

/*

render pipeline
  1. load tokens
  2. load window dimensions
  3. load zoom level
  4. load view boundary
  5. load component input
  6. calculate values
  7. calculate boundary expressions
  8. calculate surface expressions
  9. render

*/

const render = (ctx, bundle, componentName, width, height) => {
  let renderer = resolveTokens({}, bundle)
  renderer = resolveDimensions(renderer, width, height)
  renderer = resolveZoomLevel(renderer)
  renderer = resolveViewBoundary(renderer)

  resolveConstraints(renderer, bundle, componentName)

  const component = bundle.components[componentName]

  component.elements.forEach((elem) => {})

  ctx.moveTo(100, 100)
  ctx.fillStyle = '#007BFF'
  ctx.rect(0, 0, width, height)
  ctx.fill()

  return renderer
}

const loadEnvironment = (bundle, renderer = {}) => {
  return {
    ...renderer,
    tokens: bundle.tokens,
  }
}

const resolveTokens = (renderer, bundle) => {
  renderer.tokens = {}

  Object.entries(bundle.tokens).forEach(([key, value]) => {
    const tokenGroup = {}
    value.forEach((token) => {
      tokenGroup[token.title] = token.value
    })

    renderer.tokens[key] = tokenGroup
  })

  return renderer
}

const resolveDimensions = (renderer, width, height) => {
  return {
    ...renderer,
    window: {
      width,
      height,
    },
  }
}

const resolveZoomLevel = (renderer) => {
  return {
    ...renderer,
    window: {
      ...renderer.window,
      zoom: 1,
    },
  }
}

const resolveViewBoundary = (renderer, bundle) => {
  return {
    ...renderer,
    rootBoundary: getBoundary(),
  }
}

export { render, loadEnvironment, resolveDimensions, resolveZoomLevel, resolveViewBoundary }

export default {
  render,
  loadEnvironment,
  resolveDimensions,
  resolveZoomLevel,
  resolveViewBoundary,
}
