import { useRef, useEffect, useState } from 'react'

const useCanvas = () => {
  const [canvas, setCanvas] = useState({
    width: 0,
    height: 0,
    ratio: 1,
    context: null,
  })
  const canvasRef = useRef(null)
  const resizeRef = useRef(null)

  useEffect(() => {
    const resizeListener = () => {
      const { current } = canvasRef
      const context = current.getContext('2d', { alpha: true })
      const devicePixelRatio = window.devicePixelRatio || 1
      const backingStoreRatio =
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1

      const ratio = devicePixelRatio / backingStoreRatio
      const { width, height } = resizeRef.current.getBoundingClientRect()

      current.width = width * ratio
      current.height = height * ratio
      current.style.width = `${width}px`
      current.style.height = `${height}px`
      context.scale(ratio, ratio)

      setCanvas({
        width,
        height,
        ratio,
        context,
      })
    }

    window.addEventListener('resize', resizeListener)
    resizeListener()

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return {
    ...canvas,
    canvasRef,
    resizeRef,
  }
}

export default useCanvas
