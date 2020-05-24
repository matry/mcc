const calculateTextHeight = (document, fontStyle) => {
  var body = document.getElementsByTagName('body')[0]
  var dummy = document.createElement('div')

  var dummyText = document.createTextNode(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz|[]{}?/`~+=\\'
  )
  dummy.appendChild(dummyText)
  dummy.setAttribute(
    'style',
    `font: ${fontStyle}; position:absolute; top:0; left:0; line-height:1;`
  )
  body.appendChild(dummy)
  const result = dummy.offsetHeight

  body.removeChild(dummy)
  return result
}

const getLines = (ctx, textContent, width) => {
  let words = textContent.split(' ')
  let lines = ['']

  words.map((word) => {
    if (ctx.measureText(`${lines[lines.length - 1]}${word} `).width >= width) {
      lines.push(`${word} `)
    } else {
      lines[lines.length - 1] += `${word} `
    }
  })

  return lines
}

const paintText = (
  ctx,
  { width, height, left, top },
  { fontFamily, fontSize, fontWeight, fillColor, textHeight, textAlignX, textAlignY, textContent },
  ratio
) => {
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  ctx.textAlign = textAlignX

  const calculatedTextHeight = calculateTextHeight(window.document, ctx.font)

  let textY = 0
  // let fontBoxYAxis
  ctx.textBaseline = 'top'

  switch (textAlignY) {
    case 'top':
      // ctx.textBaseline = 'hanging'
      // fontBoxYAxis = 0
      textY = 0
      break
    case 'middle':
      // ctx.textBaseline = 'middle'
      // fontBoxYAxis = (fontHeight - textHeight) / 2
      textY = (textHeight - calculatedTextHeight) / 2
      break
    case 'bottom':
      // ctx.textBaseline = 'alphabetic'
      // fontBoxYAxis = fontHeight - textHeight
      textY = textHeight - calculatedTextHeight
      break
    case 'baseline':
      ctx.textBaseline = 'alphabetic'
      textY = textHeight
      break
  }

  const lines = getLines(ctx, textContent, width)

  let textX
  switch (ctx.textAlign) {
    case 'right':
      textX = left + width
      break
    case 'center':
      textX = left + width / 2
      break
    default:
      textX = left
      break
  }

  // draw text
  ctx.fillStyle = fillColor

  lines.map((line, i) => {
    ctx.fillText(line, textX, top + i * textHeight + textY)
  })
}

export { getLines, paintText }
