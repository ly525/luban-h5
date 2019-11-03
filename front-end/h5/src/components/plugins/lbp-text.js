import { quillEditor } from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './styles/text-overwrite-quil-snow-theme.scss'

export default {
  render (h) {
    const {
      color,
      textAlign,
      fontSize,
      lineHeight,
      borderColor,
      borderWidth
    } = this

    const style = {
      position: 'relative',
      textAlign,
      fontSize,
      color: `${color} !important`,
      textDecoration: 'none',
      backgroundColor: 'transparent',
      lineHeight: lineHeight + 'em',
      border: `${borderWidth}px solid ${borderColor}`
    }
    const pureText = <div domPropsInnerHTML={this.text} class="ql-editor ql-container"></div>
    return (
      <div
        onDblclick={e => {
          this.canEdit = true
          e.stopPropagation()
        }}
        onMousedown={e => {
          if (this.canEdit) { e.stopPropagation() }
        }}
        v-click-outside={(e) => {
          this.canEdit = false
        }}
        style={style}
      >
        {
          this.canEdit
            ? <quillEditor
              content={this.text}
              options={{
                modules: {
                  // toolbar: '#toolbar-wrapper'
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'], // 切换按钮
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'color': [] }, { 'background': [] }], // 主题默认下拉，使用主题提供的值
                    [{ 'align': [] }],
                    ['clean'], // 清除格式
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
                    // https://github.com/quilljs/quill/issues/1208
                  ]
                },
                theme: 'snow'
              }}
              onChange={({ quill, html, text }) => {
                this.$emit('input', {
                  value: html,
                  pluginName: 'lbp-text'
                })
              }}>
            </quillEditor>
            : pureText
        }
      </div>
    )
  },
  name: 'lbp-text',
  data () {
    return {
      canEdit: false,
      innerText: this.text || '双击修改文字'
    }
  },
  props: {
    text: {
      type: String,
      default: '双击修改文字'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    lineHeight: {
      type: Number,
      default: 1
    },
    borderWidth: {
      type: Number,
      default: 0
    },
    borderRadius: {
      type: Number,
      default: 0
    },
    borderColor: {
      type: String,
      default: '#ced4da'
    },
    borderStyle: {
      type: String,
      default: 'solid'
    }
  },
  editorConfig: {
    propsConfig: {
      borderColor: {
        type: 'a-input', // lbs-color-picker
        label: '边框颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#333333'
      },
      borderWidth: {
        type: 'a-input-number',
        label: '边框宽度(px)',
        require: true,
        prop: {
          step: 1,
          min: 0,
          max: 10
        },
        defaultPropValue: 0
      },
      borderRadius: {
        type: 'a-input-number',
        label: '圆角(px)',
        require: true,
        prop: {
          step: 0.1,
          min: 0,
          max: 10
        },
        defaultPropValue: 0
      },
      borderStyle: {
        type: 'a-input',
        label: '边框形式',
        require: true,
        defaultPropValue: 'solid'
      },
      lineHeight: {
        type: 'a-input-number',
        label: '行高',
        require: true,
        prop: {
          step: 0.1,
          min: 0.1,
          max: 10
        },
        defaultPropValue: 1
      }
    }
  }
}
