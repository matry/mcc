import { getBoundary } from './boundary'

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

const render = (ctx, bundle, width, height) => {
  let renderer = loadEnvironment(bundle)

  renderer = loadDimensions(renderer, width, height)
  renderer = loadZoomLevel(renderer)
  renderer = loadViewBoundary(renderer)

  return renderer
}

const loadEnvironment = (bundle, renderer = {}) => {
  return {
    ...renderer,
    tokens: bundle.tokens,
  }
}

const loadDimensions = (renderer, width, height) => {
  return {
    ...renderer,
    window: {
      width,
      height,
    },
  }
}

const loadZoomLevel = (renderer) => {
  return {
    ...renderer,
    window: {
      ...renderer.window,
      zoom: 1,
    },
  }
}

const loadViewBoundary = (renderer, bundle) => {
  return {
    ...renderer,
    rootBoundary: getBoundary(),
  }
}

export { render, loadEnvironment, loadDimensions, loadZoomLevel, loadViewBoundary }

export default {
  render,
  loadEnvironment,
  loadDimensions,
  loadZoomLevel,
  loadViewBoundary,
}
