import MemStore from './MemStore'

class Renderer {
  constructor(bundle) {
    this.model = new MemStore()
    this.model.batchIngest(bundle)
  }

  selectComponent(componentName) {
    this.component = this.model.getById('components', componentName)
    return this.component
  }

  countCalculatedFields() {
    const valuesCount = this.model.countEntries('values')
    const stylesCount = this.model.countEntries('styles')

    return valuesCount + stylesCount
  }

  render(ctx, width, height) {
    const { elements } = this.model.aggregateByContextKey(['elements'], this.component.title)

    elements.forEach((element) => {
      const styles = this.model.mapByKey('styles', {
        component: this.component.title,
        element: element.title,
      })
      const elementWidth = styles.width
      const elementHeight = styles.height

      ctx.fillStyle = styles['fill-color'] || 'transparent'
      ctx.beginPath()
      ctx.rect(
        width / 2 - elementWidth / 2,
        height / 2 - elementHeight / 2,
        elementWidth,
        elementHeight
      )
      ctx.fill()
      ctx.closePath()
    })
  }
}

export default Renderer
