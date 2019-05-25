const sharp = require('sharp')

const WHITE = { r: 255, g: 255, b: 255 }
const DEFAULT_WIDTH_AND_HEIGHT = 2000
const DEFAULT_PADDING_RATIO = 0.025

async function instagram(input, widthAndHeight) {
  const padding = Math.floor(widthAndHeight * DEFAULT_PADDING_RATIO)
  const realWidthAndHeight = widthAndHeight - padding * 2

  await sharp(input)
    .resize({
      width: realWidthAndHeight,
      height: realWidthAndHeight,
      fit: sharp.fit.contain,
      background: WHITE
    })
    .extend({
      top: padding,
      left: padding,
      bottom: padding,
      right: padding,
      background: WHITE
    })
    .jpeg()
    .toFile('output/instagram.jpg', (err, info) => {
      if (err) console.error(err)
      console.log(info)
    })
  return true
}

async function twitter(input, widthOrHeight) {
  await sharp(input)
    .resize({
      width: widthOrHeight,
      height: widthOrHeight,
      fit: sharp.fit.inside
    })
    .jpeg()
    .toFile('output/twitter.jpg', (err, info) => {
      if (err) console.error(err)
      console.log(info)
    })
  return true
}

async function engine(input) {
  const metadata = await sharp(input).metadata()
  const maxWidthOrHeight = Math.max(metadata.width, metadata.height)
  const widthOrHeight =
    maxWidthOrHeight > DEFAULT_WIDTH_AND_HEIGHT
      ? DEFAULT_WIDTH_AND_HEIGHT
      : maxWidthOrHeight
  await twitter(input, widthOrHeight)
  await instagram(input, widthOrHeight)
  return true
}

engine('paysage.jpg')
