import clm from 'clmtrackr'
import dragAndDropSelect from './src/dragAndDropSelect'
import fileToImage from './src/fileToImage'
import drawMole from './src/drawMole'
import { HTML } from './src/settings'

const image = new Image()

const canvas = document.getElementById(HTML.CANVAS_ID)
const context = canvas.getContext('2d')
const dropArea = document.getElementById(HTML.DROP_AREA_ID)
const fileInput = document.getElementById(HTML.FILE_INPUT_ID)

dragAndDropSelect(dropArea, fileInput)
fileInput.addEventListener('input', e => {
  e.preventDefault()
  fileToImage(e.target.files[0]).then(result => image.src = result).catch(e => alert(e))
})

image.onload = () => {
  canvas.setAttribute('width', image.width)
  canvas.setAttribute('height', image.height)
  context.drawImage(image, 0, 0, image.width, image.height)

  const tracker = new clm.tracker()
  tracker.init()
  tracker.start(canvas)

  const track = (count) => {
    if (count > 0) {
      requestAnimationFrame(() => track(count - 1))
    } else {
      tracker.stop()
      drawMole(context, tracker.getCurrentPosition(), getKey())
    }
  }
  track(30)
}
