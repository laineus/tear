import TearMole from './TearMole'
import dragAndDropSelect from './dragAndDropSelect'
import fileToImage from './fileToImage'

const canvas = document.getElementById('canvas')
const tearMole = new TearMole(canvas)

const dropArea = document.getElementById('dropArea')
const fileInput = document.getElementById('fileInput')
dragAndDropSelect(dropArea, fileInput)

fileInput.addEventListener('input', e => {
  e.preventDefault()
  fileToImage(e.target.files[0]).then(src => {
    tearMole.setImageSrc(src)
    fileInput.value = null
  }).catch(console.error)
})

const radioList = document.querySelectorAll('input[name="key"]')
radioList.forEach(radio => {
  radio.addEventListener('input', e => {
    tearMole.setKey(e.currentTarget.value)
    tearMole.updateMole()
  })
})

const progress = document.getElementById('progress')
const progressBar = document.getElementById('progressBar')
const download = document.getElementById('download')
tearMole.onStart = () => {
  progress.classList.remove('hide')
  canvas.classList.add('hide')
  download.classList.add('hide')
}
tearMole.onProgress = progress => {
  progressBar.style.width = `${progress}%`
}
tearMole.onEnd = () => {
  progress.classList.add('hide')
  canvas.classList.remove('hide')
  download.classList.remove('hide')
}

download.addEventListener('click', e => {
  e.preventDefault()
  const link = document.createElement('a')
  link.href = tearMole.canvas.toDataURL('image/png')
  link.download = 'output.png'
  link.click()
})
