import animationMixin from '@/mixins/animation.js'

export default {
  mixins: [animationMixin],
  props: ['element'],
  mounted () {
    this.runAnimations()
  },
  render (h) {
    return (
      <div style={ this.element.getStyle({ position: 'absolute' })}>
        {this.$slots.default}
      </div>
    )
  }
}
