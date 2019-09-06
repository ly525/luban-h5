import html2canvas from 'html2canvas'

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
    html2canvas(el, { allowTaint: true }).then(canvas => {
      // document.body.appendChild(canvas) use this line to test the generated canvas
      canvas.toBlob(blob => {
        const file = new window.File([blob], fileName, { type: 'image/png' })
        resolve(file)
      })
    })
  })
}
