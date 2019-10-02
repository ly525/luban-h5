import html2canvas from 'html2canvas'

// https://stackoverflow.com/questions/12168909/blob-from-dataurl
function dataURItoBlob (dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  var ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString })
  return blob
}

/**
 * 生成作品封面图(截图)
 * @param {String} selector
 * @param {文件名} fileName
 */
export function takeScreenshot (selector = '.canvas-wrapper', fileName = `${+new Date()}`) {
  const el = document.querySelector(selector)
  return new Promise((resolve, reject) => {
    // html2canvas document: https://html2canvas.hertzen.com/configuration
    // allowTaint: Whether to allow cross-origin images to taint the canvas
    // if you use allowTaint: true, the cors image will taint the canvas, and canvas.toDataURL won't work
    // 会对canvas造成污染，导致 canvas.toDataURL 无效
    html2canvas(el, { proxy: '/works/cors-proxy' }).then(canvas => {
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.6)
      const blob = dataURItoBlob(dataUrl)
      const file = new window.File([blob], fileName, { type: 'image/png' })
      resolve(file)
      // canvas.toBlob(blob => {
      //   const file = new window.File([blob], fileName, { type: 'image/png' })
      //   resolve(file)
      // })
    })
  })
}
