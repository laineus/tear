export default file => {
  return new Promise((resolve, reject) => {
    if (!file.type.match(/^image\/(png|jpeg|gif)$/)) {
      return reject(new Error('File type not allowed.'))
    }
    const reader = new FileReader()
    reader.onload = e => resolve(e.target.result)
    reader.readAsDataURL(file)
  })
}
