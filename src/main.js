import TearMole from './TearMole'
import dragAndDropSelect from './dragAndDropSelect'
import drawImageFileToCanvas from './drawImageFileToCanvas'

const canvas = document.getElementById('canvas')
const tearMole = new TearMole()

const dropArea = document.getElementById('dropArea')
const fileInput = document.getElementById('fileInput')
dragAndDropSelect(dropArea, fileInput)

fileInput.addEventListener('change', e => {
  e.preventDefault()
  drawImageFileToCanvas(e.target.files[0], canvas).then(canvas => {
    tearMole.init(canvas)
    fileInput.value = null
  }).catch(console.error)
})

const radioList = document.querySelectorAll('input[name="key"]')
radioList.forEach(radio => {
  radio.addEventListener('change', e => {
    tearMole.setKey(e.currentTarget.value)
    tearMole.updateMole()
  })
})

const progress = document.getElementById('progress')
const progressBar = document.getElementById('progressBar')
const fail = document.getElementById('fail')
const download = document.getElementById('download')
tearMole.onStart = () => {
  progress.classList.remove('hide')
  fail.classList.add('hide')
  canvas.classList.add('hide')
  download.classList.add('hide')
}
tearMole.onProgress = progress => {
  progressBar.style.width = `${progress}%`
}
tearMole.onEnd = result => {
  progress.classList.add('hide')
  canvas.classList.remove('hide')
  if (!result) fail.classList.remove('hide')
  if (result) download.classList.remove('hide')
}

download.addEventListener('click', e => {
  e.preventDefault()
  const link = document.createElement('a')
  link.href = tearMole.canvas.toDataURL('image/png')
  link.download = 'output.png'
  link.click()
})
