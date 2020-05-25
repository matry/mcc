const resolvers = {
  assignment: (renderer, bundle, valueObject) => {
    const { value } = valueObject

    if (!isNaN(value)) {
      return value
    }

    if (value.charAt(0) === value.charAt(0).toUpperCase()) {
      return value
    }
  },
}

const resolveConstraints = (renderer, bundle, componentName) => {
  const bundleCopy = { ...bundle }

  bundleCopy.components[componentName].values.forEach((value) => {})

  return bundleCopy
}

export { resolveConstraints }

export default {
  resolveConstraints,
}
