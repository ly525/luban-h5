import { mapState, mapActions } from 'vuex'

export default {
  props: ['element'],
  computed: {
    ...mapState('editor', ['editingElement', 'work', 'editingPage']),
    otherElements () {
      return this.editingPage.elements.filter(ele => {
        return ele.name !== 'lbp-background' || ele.uuid === this.editingElement.uuid
      })
    }
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement',
      'setElementPosition',
      'setElementShape',
      'recordElementRect',
      'elementManager',
      'updateWork'
    ]),
    checkMeeting () {
      // var targetEle = box.getBoundingClientRect();
      const baseCurrentEle = this.editingElement.commonStyle
      const currentEle = {
        ...baseCurrentEle,
        right: baseCurrentEle.left + baseCurrentEle.width,
        bottom: baseCurrentEle.top + baseCurrentEle.height
      }
      this.otherElements.forEach(baseTargetEle => {
        const targetEle = {
          ...baseTargetEle,
          right: baseTargetEle.left + baseTargetEle.width,
          bottom: baseTargetEle.top + baseTargetEle.height
        }
        // 如果满足这4个条件的任意一个时候，说明没有发生碰撞，那么相反就是发生了碰撞。
        const isMeeting = !(
          targetEle.bottom < currentEle.top ||
          targetEle.left > currentEle.right ||
          targetEle.top > currentEle.bottom ||
          targetEle.right < currentEle.left
        )
        console.log(isMeeting, '-checkMeeting')
        if (isMeeting) {
          baseTargetEle.backgroundColor = 'red'
        }
      })
    }
  },
  mounted () {
    const canvasWrapper = document.querySelector('.canvas-wrapper')
    this.canvasWrapperPosition = canvasWrapper.getBoundingClientRect()
  },
  render (h) {
    return (
      <div
        style="height: 100%;"
        v-drag={{
          stop: true,
          init: () => {
            this.setEditingElement(this.element)
          },
          start: (e, { offsetX, offsetY }) => {
            e.stopPropagation()
            // e代表 editingElement
            console.log('-----start->>>>')
            const eleft = this.element.commonStyle.left
            const etop = this.element.commonStyle.top
            this.setElementPosition({ left: eleft + offsetX, top: etop + offsetY })
            this.checkMeeting()
          }
        }}
      >
        {this.$slots.default}
      </div>
    )
  }
}
