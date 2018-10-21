import exif from 'exif-js'

const MAX_SIZE = 1000

const resizeImage = image => {
  if (image.width <= MAX_SIZE && image.height <= MAX_SIZE) return
  if (image.width === image.height) {
    image.width = MAX_SIZE
    image.height = MAX_SIZE
  } else if (image.width > image.height) {
    image.width = Math.round(image.width / image.height * MAX_SIZE)
    image.height = MAX_SIZE
  } else {
    image.height = Math.round(image.height / image.width * MAX_SIZE)
    image.width = MAX_SIZE
  }
}
const transformCanvasAndContext = (canvas, context, image) => {
  exif.getData(image)
  if (!image.exifdata || !image.exifdata.Orientation) return
  if (image.exifdata.Orientation > 4 && image.exifdata.Orientation < 9) {
    canvas.width = image.height
    canvas.height = image.width
  }
  switch (image.exifdata.Orientation) {
    case 2: return context.transform(-1, 0, 0, 1, image.width, 0)
    case 3: return context.transform(-1, 0, 0, -1, image.width, image.height)
    case 4: return context.transform(1, 0, 0, -1, 0, image.height)
    case 5: return context.transform(0, 1, 1, 0, 0, 0)
    case 6: return context.transform(0, 1, -1, 0, image.height, 0)
    case 7: return context.transform(0, -1, -1, 0, image.height, image.width)
    case 8: return context.transform(0, -1, 1, 0, 0, image.width)
  }
}
const optmizeSrc = src => {
  return new Promise(resolve => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      resizeImage(image)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = image.width
      canvas.height = image.height
      transformCanvasAndContext(canvas, context, image)
      context.drawImage(image, 0, 0, image.width, image.height)
      resolve(canvas.toDataURL('image/png'))
    }
  })
}

export default file => {
  return new Promise((resolve, reject) => {
    if (!file.type.includes('image/')) return reject(new Error('ファイルの形式が不正です'))
    if (!window.FileReader) return reject(new Error('画像の読み込みに対応していません'))
    const reader = new FileReader()
    reader.onload = e => resolve(optmizeSrc(e.target.result))
    reader.onerror = () => reject(new Error('File reading failed'))
    reader.readAsDataURL(file)
  })
}
