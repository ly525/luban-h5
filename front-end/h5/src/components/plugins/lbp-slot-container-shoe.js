import PropTypes from '@luban-h5/plugin-common-props'
import placeholderImg from './lbp-picture-placeholder.png' // issue #34

export default {
  name: 'lbp-slot-container-shoe',
  extra: {
    defaultStyle: {
      width: 320,
      height: 150
    }
  },
  render () {
    return <div class="slot-container" style="border: 1px dashed red;">
      <img width="80%" height="80%" src={this.imgSrc || placeholderImg} style={{ objectFit: this.fillType }} alt="" srcset="" />
      {this.$slots.default}
    </div>
  },
  props: {
    imgSrc: PropTypes.image()
  },
  data: () => ({
    placeholderImg
  })
}
