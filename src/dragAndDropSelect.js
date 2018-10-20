export default (dropArea, input) => {
  dropArea.addEventListener('dragover', e => {
    e.preventDefault()
    dropArea.classList.add('dragover')
  })
  dropArea.addEventListener('dragleave', e => {
    e.preventDefault()
    dropArea.classList.remove('dragover')
  })
  dropArea.addEventListener('drop', e => {
    e.preventDefault()
    dropArea.classList.remove('dragover')
    input.files = e.dataTransfer.files
  })
}
