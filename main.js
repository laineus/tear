import clm from 'clmtrackr'
import dragAndDropSelect from './src/dragAndDropSelect'
import inputToImage from './src/inputToImage'
import drawMole from './src/drawMole'
import { HTML } from './src/settings'

const tracker = new clm.tracker()
const image = new Image()

const canvas = document.getElementById(HTML.CANVAS_ID)
const context = canvas.getContext('2d')
const dropArea = document.getElementById(HTML.DROP_AREA_ID)
const fileInput = document.getElementById(HTML.FILE_INPUT_ID)

dragAndDropSelect(dropArea, fileInput)
inputToImage(fileInput).then(result => image.src = result).catch(e => alert(e))

image.onload = () => {
  canvas.setAttribute('width', image.width)
  canvas.setAttribute('height', image.height)
  context.drawImage(image, 0, 0, image.width, image.height)

  tracker.init()
  tracker.start(canvas)

  const track = (count, callback) => {
    count ? requestAnimationFrame(() => track(count - 1, callback)) : callback(tracker.getCurrentPosition())
  }
  track(30, position => drawMole(context, position, true))
}
