import clm from 'clmtrackr'

const tracker = new clm.tracker({ stopOnConvergence: true })
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
  const drawLoop = () => {
    requestAnimationFrame(drawLoop)
    overlayCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    if (tracker.getCurrentPosition()) {
      tracker.draw(overlayCanvas)
    }
  }
  drawLoop()
}
img.src = 'sample.png'

