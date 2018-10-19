import clm from 'clmtrackr'

const POINTS = {
  LEFT: {
    EYE: 28,
    CORNER: 13
  },
  RIGHT: {
    EYE: 23,
    CORNER: 1
  }
}

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
  drawLoop(100, pos => {
    if (!pos) return
    const key = 'RIGHT'
    const x = (pos[POINTS[key].EYE][0] + pos[POINTS[key].CORNER][0]) / 2
    const y = (pos[POINTS[key].EYE][1] + pos[POINTS[key].CORNER][1]) / 2
    imageCtx.arc(x, y, 2, (0 * Math.PI / 180), (360 * Math.PI / 180), false)
    imageCtx.fillStyle = 'rgba(15, 10, 0, 0.8)';
    imageCtx.fill()
    overlayCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
  })
}
img.src = 'sample.jpg'
