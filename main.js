import TearMole from './src/TearMole'
import dragAndDropSelect from './src/dragAndDropSelect'
import fileToImage from './src/fileToImage'
import { HTML } from './src/settings'

const canvas = document.getElementById(HTML.CANVAS_ID)
const tearMole = new TearMole(canvas)

const dropArea = document.getElementById(HTML.DROP_AREA_ID)
const fileInput = document.getElementById(HTML.FILE_INPUT_ID)
dragAndDropSelect(dropArea, fileInput)

fileInput.addEventListener('input', e => {
  e.preventDefault()
  fileToImage(e.target.files[0]).then(src => tearMole.setImageSrc(src)).catch(console.error)
})

const radioList = document.querySelectorAll('input[name="key"]')
radioList.forEach(radio => {
  radio.addEventListener('input', e => {
    tearMole.setKey(e.currentTarget.value)
    tearMole.updateMole()
  })
})
