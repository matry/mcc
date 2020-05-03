const generateRootFragment = (width, height) => {
  return {
    title: 'root',
    parent: null,
    styles: {
      width,
      height,
    },
  }
}

export { generateRootFragment }
