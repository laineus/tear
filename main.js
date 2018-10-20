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
const MOLE_SIZE = 0.005 // 1.0 = face width
const MOLE_POSITION = 0.3 // (eye) 0.0 ... 1.0 (face corner)

const tracker = new clm.tracker()
tracker.init()

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const img = new Image()
img.onload = () => {
  canvas.setAttribute('width', img.width)
  canvas.setAttribute('height', img.height)
  context.drawImage(img, 0, 0, img.width, img.height)

  tracker.start(canvas)

  const track = (count, callback) => {
    count ? requestAnimationFrame(() => track(count - 1, callback)) : callback(tracker.getCurrentPosition())
  }
  track(30, pos => {
    if (!pos) return
    const key = 'LEFT'
    const faceSize = Math.abs(pos[POINTS.LEFT.CORNER][0] - pos[POINTS.RIGHT.CORNER][0])
    const arcSize = faceSize * MOLE_SIZE
    const x = pos[POINTS[key].EYE][0] + (pos[POINTS[key].CORNER][0] - pos[POINTS[key].EYE][0]) * MOLE_POSITION
    const y = pos[POINTS[key].EYE][1] + (pos[POINTS[key].CORNER][1] - pos[POINTS[key].EYE][1]) * MOLE_POSITION
    context.arc(x, y, arcSize, (0 * Math.PI / 180), (360 * Math.PI / 180), false)
    context.shadowBlur = arcSize
    context.shadowColor = 'rgba(35, 20, 5, 1)'
    context.fillStyle = 'rgba(35, 20, 5, 0.3)'
    context.fill()
  })
}
img.src = 'sample.jpg'
