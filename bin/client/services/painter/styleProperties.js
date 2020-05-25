const styleProperties = {
  'fill-color': (value) => {
    return {
      fillStyle: value,
    }
  },
  width: (width) => ({ width }),
  height: (height) => ({ height }),
  right: (right) => ({ right }),
  left: (left) => ({ left }),
  top: (top) => ({ top }),
  bottom: (bottom) => ({ bottom }),
}

export default styleProperties
