import PropTypes from '@luban-h5/plugin-common-props'
import './styles/picture-shoe.scss'

import placeholderImg from './lbp-picture-placeholder.png' // issue #34
export default {
  name: 'lbp-slot-container',
  render () {
    return <div
      class="shoe-picture"
      v-hover={{ over: (e) => {
        console.log('0000')
        this.menuVisible = true
      },
      leave: (e) => {
        this.menuVisible = false
      } }}>
      <img width="80%" height="80%" src={this.imgSrc || placeholderImg} style={{ objectFit: this.fillType }} alt="" srcset="" />
      {this.shoeProps.map(prop => (
        <span>{prop}</span>
      ))}
      <a-popover class="menu-icon" placement="right">
        <template slot="content">
          <a-checkbox-group
            name="checkboxgroup"
            options={[
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear', value: 'Pear' },
              { label: 'Orange', value: 'Orange' }
            ]}
            onChange={(e) => {
              this.shoeProps = e
            }}
          />
        </template>
        <a-icon type="plus-circle" />
      </a-popover>
    </div>
  },
  props: {
    imgSrc: PropTypes.image(),
    fillType: {
      type: String,
      default: 'contain',
      editor: {
        type: 'a-select',
        label: '填充方式',
        props: {
          options: [
            { label: 'contain 短边缩放', value: 'contain' },
            { label: 'cover 长边缩放', value: 'cover' },
            { label: 'fill 拉伸', value: 'fill' },
            { label: 'none 原始', value: 'none' },
            { label: 'scale-down 弹性缩放', value: 'scale-down' }
          ]
        }
      }
    }
  },
  data: () => ({
    placeholderImg,
    menuVisible: false,
    shoeProps: []
  })
}
