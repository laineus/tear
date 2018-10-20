import clm from 'clmtrackr'
import { TRACK_POINTS, MOLE } from './settings'
export default class {
  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.setKey('LEFT')
    this.image = new Image()
    this.image.onload = () => {
      this.drawImage()
      this.resetTracker()
      if (this.onStart) this.onStart()
      this.track(MOLE.TRACK_COUNT)
    }
  }
  setKey (key) {
    this.key = key
  }
  setImageSrc (src) {
    this.image.src = src
  }
  drawImage () {
    this.canvas.setAttribute('width', this.image.width)
    this.canvas.setAttribute('height', this.image.height)
    this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height)
    this.origin = this.context.getImageData(0, 0, this.image.width, this.image.height)
  }
  resetTracker () {
    if (this.tracker) this.tracker.stop()
    this.tracker = new clm.tracker()
    this.tracker.init()
    this.tracker.start(this.canvas)
  }
  track (count) {
    if (this.onProgress) this.onProgress(Math.round((MOLE.TRACK_COUNT - count) / MOLE.TRACK_COUNT * 100))
    if (count > 0) {
      requestAnimationFrame(() => this.track(count - 1))
    } else {
      this.tracker.stop()
      const result = this.drawMole()
      if (this.onEnd) this.onEnd(result)
    }
  }
  drawMole () {
    const position = this.tracker.getCurrentPosition()
    if (!position) return false
    const faceSize = Math.abs(position[TRACK_POINTS.LEFT.CORNER][0] - position[TRACK_POINTS.RIGHT.CORNER][0])
    const arcSize = faceSize * MOLE.SIZE
    const diffX = position[TRACK_POINTS[this.key].CORNER][0] - position[TRACK_POINTS[this.key].EYE][0]
    const diffY = position[TRACK_POINTS[this.key].CORNER][1] - position[TRACK_POINTS[this.key].EYE][1]
    const x = position[TRACK_POINTS[this.key].EYE][0] + (diffX * MOLE.POSITION)
    const y = position[TRACK_POINTS[this.key].EYE][1] + (diffY * MOLE.POSITION)
    this.context.beginPath()
    this.context.arc(x, y, arcSize, (0 * Math.PI / 180), (360 * Math.PI / 180), false)
    this.context.shadowBlur = arcSize
    this.context.shadowColor = 'rgba(50, 20, 5, 1)'
    this.context.fillStyle = 'rgba(50, 20, 5, 0.3)'
    this.context.fill()
    return true
  }
  updateMole () {
    if (!this.origin) return
    this.context.putImageData(this.origin, 0, 0)
    this.drawMole()
  }
}
