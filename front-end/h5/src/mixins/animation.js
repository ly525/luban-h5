// https://stackoverflow.com/questions/26874769/getcomputedstyle-and-csstext-in-ie-and-firefox
function getComputedCSSText (style) {
  let cssText = ''
  for (let attr in style) {
    // m <?> matched
    // #!en: hump to line
    // #!zh: 驼峰转下划线
    cssText += `${attr.replace(/[A-Z]+/g, m => `-${m.toLowerCase()}`)}:${style[attr]};`
  }
  return cssText
}

export default {
  methods: {
    async runAnimations () {
      const animationQueue = this.animations || this.element.animations || []
      let len = animationQueue.length
      if (len === 0) return

      let that = this
      let parentNode = this.$el
      let animIdx = 0
      const oldStyle = that.element.getStyle({ position: 'absolute' })
      runAnimation()

      function runAnimation () {
        if (animIdx < len) {
          const animation = animationQueue[animIdx]
          let animationStyle = {
            animationName: animation.type,
            animationDuration: `${animation.duration}s`,
            animationIterationCount: animation.infinite ? 'infinite' : animation.interationCount,
            animationDelay: `${animation.delay}s`,
            animationFillMode: 'both'
          }
          parentNode.style.cssText = getComputedCSSText(animationStyle) + getComputedCSSText(oldStyle)
          animIdx++
        } else {
          // reset to the initial state after the animation ended
          parentNode.style.cssText = getComputedCSSText(oldStyle)
        }
      }
      parentNode.addEventListener('animationend', runAnimation, false)
    }
  },
  created () {
    const that = this
    window.getEditorApp.$on('RUN_ANIMATIONS', () => {
      if (that.active) {
        that.runAnimations()
      }
    })
  }

}
