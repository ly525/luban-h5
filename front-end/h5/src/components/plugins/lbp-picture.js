import PropTypes from '@luban-h5/plugin-common-props'

import placeholderImg from './lbp-picture-placeholder.png' // issue #34
export default {
  name: 'lbp-picture',
  render () {
    return <img src={this.imgSrc || placeholderImg} alt="" srcset="" width="100%" />
  },
  props: {
    imgSrc: PropTypes.image()
  },
  data: () => ({
    placeholderImg
  })
}
