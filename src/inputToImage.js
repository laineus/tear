export default input => {
  return new Promise((resolve, reject) => {
    input.addEventListener('input', e => {
      e.preventDefault()
      const file = e.target.files[0]
      if (!file.type.match(/^image\/(png|jpeg|gif)$/)) {
        return reject(new Error('File type not allowed.'))
      }
      const reader = new FileReader()
      reader.onload = e => resolve(e.target.result)
      reader.readAsDataURL(file)
    })
  })
}
