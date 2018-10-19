import clm from 'clmtrackr'

const tracker = new clm.tracker()
tracker.init()

const imageCanvas = document.getElementById('image')
const imageCtx = imageCanvas.getContext('2d')
const overlayCanvas = document.getElementById('overlay')
const overlayCtx = overlayCanvas.getContext('2d')

const img = new Image()
img.onload = () => {
  imageCanvas.setAttribute('width', img.width)
  imageCanvas.setAttribute('height', img.height)
  overlayCanvas.setAttribute('width', img.width)
  overlayCanvas.setAttribute('height', img.height)
  imageCtx.drawImage(img, 0, 0, img.width, img.height)

  tracker.start(imageCanvas)

  const drawLoop = (count, callback) => {
    const pos = tracker.getCurrentPosition()
    if (pos) {
      overlayCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
      tracker.draw(overlayCanvas)
    }
    count ? requestAnimationFrame(() => drawLoop(count - 1, callback)) : callback(pos)
  }
  drawLoop(100, ret => {
    console.log(ret)
  })
}
img.src = 'sample.jpg'
