import PropTypes from '@luban-h5/plugin-common-props'
import './styles/picture-shoe.scss'

import placeholderImg from './lbp-picture-placeholder.png' // issue #34
let x = 20
export default {
  name: 'lbp-picture',
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
      {this.children.map((prop, index) => {
        const style = {
          border: 'order:1px dashed grey',
          margin: '4px',
          position: 'absolute',
          top: prop.top + 'px',
          left: prop.left + 'px'
        }
        return <div
          style={style}
          v-drag={{
            start: (e) => {
              console.log('start', e)
              prop.left = prop.left + e.target.offsetX
              prop.top = prop.top + e.target.offsetY
            },
            end: (e) => {
              this.menuVisible = false
            }
          }}
          onDragstart={e => {
            e.preventDefault()
            console.log(e)
          }}>{prop.content}</div>
      })}
      <a-popover class="menu-icon" placement="right">
        <template slot="content">
          <a-checkbox-group
            name="checkboxgroup"
            options={[
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear', value: 'Pear' },
              { label: 'Orange', value: 'Orange' }
            ]}
            onChange={(items) => {
              this.children = items.map(item => ({
                content: item,
                top: 100,
                left: (x += 20)
              }))
              // this.children = e
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
    shoeProps: [],
    children: []
  })
}
