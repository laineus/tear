import { TRACK_POINTS, MOLE } from './settings'

export default (context, position, left) => {
  if (!position) return
  const key = left ? 'LEFT' : 'RIGHT'
  const faceSize = Math.abs(position[TRACK_POINTS.LEFT.CORNER][0] - position[TRACK_POINTS.RIGHT.CORNER][0])
  const arcSize = faceSize * MOLE.SIZE
  const diffX = position[TRACK_POINTS[key].CORNER][0] - position[TRACK_POINTS[key].EYE][0]
  const diffY = position[TRACK_POINTS[key].CORNER][1] - position[TRACK_POINTS[key].EYE][1]
  const x = position[TRACK_POINTS[key].EYE][0] + (diffX * MOLE.POSITION)
  const y = position[TRACK_POINTS[key].EYE][1] + (diffY * MOLE.POSITION)
  context.arc(x, y, arcSize, (0 * Math.PI / 180), (360 * Math.PI / 180), false)
  context.shadowBlur = arcSize
  context.shadowColor = 'rgba(35, 20, 5, 1)'
  context.fillStyle = 'rgba(35, 20, 5, 0.3)'
  context.fill()
}
