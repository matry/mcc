const getBoundary = (renderer) => {
  return {
    width: 0,
    height: 0,
    top: {
      top: 0,
      bottom: 0,
    },
    right: {
      right: 0,
      left: 0,
    },
    bottom: {
      top: 0,
      bottom: 0,
    },
    left: {
      right: 0,
      left: 0,
    },
    centerX: {
      right: 0,
      left: 0,
    },
    centerY: {
      top: 0,
      bottom: 0,
    },
  }
}

export { getBoundary }
