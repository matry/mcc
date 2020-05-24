const styleProperties = {
  'fill-color': (value) => {
    return {
      fillStyle: value,
    }
  },
  width: (width) => ({ width }),
  height: (height) => ({ height }),
}

export default styleProperties
