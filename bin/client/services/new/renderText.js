const renderText = (ctx, styles) => {
  const { content, font, top, left, textBaseline, textAlign, fillStyle } = styles

  ctx.font = font
  ctx.textBaseline = textBaseline
  ctx.textAlign = textAlign
  ctx.fillStyle = fillStyle
  ctx.fillText(content, left, top)
}

export default renderText
