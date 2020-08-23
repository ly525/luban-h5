export function contains (root, n) {
  let node = n
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }

  return false
}

/**
 *
 * @param {*} param0 canvas 实现 watermark
 */
export function renderWaterMark ({
  // 使用 ES6 的函数默认值方式设置参数的默认取值
  // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
  container = document.body,
  width = '100px',
  height = '100px',
  textAlign = 'center',
  textBaseline = 'middle',
  fontSize = 16,
  fillStyle = 'rgba(184, 184, 184, 0.2 )',
  content = '水印文字',
  rotate = 0,
  zIndex = 1000
} = {}) {
  var canvas = document.createElement('canvas')

  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  var ctx = canvas.getContext('2d')

  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = `${fontSize}px Arial`
  ctx.fillStyle = fillStyle
  // ctx.rotate(Math.PI / 180 * rotate);
  ctx.fillText(content, 0, parseFloat(height) / 3)

  var base64Url = canvas.toDataURL()
  const wmEl = document.querySelector('.luban_h5__wm')

  const watermarkDiv = wmEl || document.createElement('div')
  const styleStr = `
    transform: rotate(${rotate}deg);
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`

  watermarkDiv.setAttribute('style', styleStr)

  if (!wmEl) {
    watermarkDiv.classList.add('luban_h5__wm')
    container.style.position = 'relative'
    container.insertBefore(watermarkDiv, container.firstChild)
  }
}
