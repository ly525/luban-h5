export default {
  render () {
    const {
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth,
      text,
      disabled
    } = this

    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none',
      disabled
    }
    return (
      <button
        style={style}
        onClick={this.handleClick}
      >{text}</button>)
  },
  name: 'lbp-form-button',
  props: {
    text: {
      type: String,
      default: '按钮'
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请填写提示文字'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    color: {
      type: String,
      default: 'black'
    },
    fontSize: {
      type: Number,
      default: 14
    },
    lineHeight: {
      type: Number,
      default: 1
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    borderRadius: {
      type: Number,
      default: 0
    },
    borderColor: {
      type: String,
      default: '#ced4da'
    },
    textAlign: {
      type: String,
      default: 'center'
    }
    // pageMode: {
    //   type: String,
    //   default: 'edit'
    // }
  },
  methods: {
    handleClick () {
      if (this.disabled) return

      // #!zh: data-type=lbp-form-input 在 lbp-form-input 组件中定义
      let inputs = document.querySelectorAll("[data-type^='lbp-form-input']")
      if (!inputs.length) return
      const self = this
      let formData = new FormData()
      inputs.forEach(input => formData.append(input.dataset.uuid, input.value))
      const req = new XMLHttpRequest()
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          const message = req.status === 200 ? '提交成功' : '提交失败'
          self.$message.info(message)
        }
      }

      // #!zh: vuex.module.editor.setWork 中定义
      const workId = window.__work.id
      // TODO #!zh: 可以动态配置表单提交地址
      req.open('post', `/works/form/submit/${workId}`, true)
      req.send(formData)
    }
  },
  editorConfig: {
    propsConfig: {
      text: {
        type: 'a-input',
        label: '按钮文字',
        require: true,
        defaultPropValue: '按钮'
      },
      fontSize: {
        type: 'a-input-number',
        label: '字号(px)',
        require: true,
        prop: {
          step: 1,
          min: 12,
          max: 144
        },
        defaultPropValue: 14
      },
      color: {
        type: 'a-input',
        label: '文字颜色',
        // !#zh 为编辑组件指定 prop
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: 'black'
      },
      backgroundColor: {
        type: 'a-input', // lbs-color-picker
        label: '背景颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#ffffff' // TODO why logogram for color does't work?
      },
      borderColor: {
        type: 'a-input', // lbs-color-picker
        label: '边框颜色',
        prop: {
          type: 'color'
        },
        require: true,
        defaultPropValue: '#eeeeee'
      },
      borderWidth: {
        type: 'a-input-number',
        label: '边框宽度(px)',
        require: true,
        prop: {
          step: 1,
          min: 1,
          max: 10
        },
        defaultPropValue: 1
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
      },
      textAlign: {
        /**
         * #!en: you can also config type like below:
         * #!zh: 可以直接这样写：
          textAlign: {
            type: component(component definition json/自定义的组件，比如下面的 components[''lbs-text-align'])
          }

        * more explanation
          textAlign: {
            type: {
              render() {},
              props: {},
              methods: {},
            }
          }
         * #!en: reference: how to judge the tag is custom component or a HTML element in React or Vue?
         * !#zh:
         * 思路来源：
         * React 中 深入JSX 中，如何判断 h(tag) 中的 tag 是自定义组件还是普通 HTML 元素呢？React 是判断该 tag 是否为 function 来实现的
         * Vue 中的自定义组件 是一个普通的 JSON 对象，最后自定义组件被转换成了函数，输入是 JSON 输出是 函数，可以看看 Vue 中 createElement 也就是 h 的实现·
         * 参见：http://hcysun.me/2018/01/05/%E6%8E%A2%E7%B4%A2Vue%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6/
         */
        type: 'lbs-text-align',
        label: '文字对齐',
        require: true,
        defaultPropValue: 'center'
      }
    },
    components: {
      'lbs-text-align': {
        template: `
          <div class="wrap">
            <a-radio-group v-model="value_" size="small">
              <a-tooltip effect="dark" :content="item.label" placement="top" :key="index" v-for="(item, index) in textAlignTabs">
                <a-radio-button :label="item.value">
                  <!-- issue #8 -->
                  <i :class="['fa', 'fa-align-'+item.value]" aria-hidden="true"></i>
                </a-radio-button>
              </a-tooltip>
            </a-radio-group>
          </div>`,
        props: {
          value: {
            type: [String, Number]
          }
        },
        data: () => ({
          textAlignTabs: [{
            label: '左对齐',
            value: 'left'
          },
          {
            label: '居中对齐',
            value: 'center'
          },
          {
            label: '右对齐',
            value: 'right'
          }]
        }),
        computed: {
          value_: {
            // TODO 关于箭头函数中的this：这里不能写成箭头函数，否则 this 为 undefined，为何？
            // http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/
            // https://tangxiaolang101.github.io/2016/08/01/%E6%B7%B1%E5%85%A5%E6%8E%A2%E8%AE%A8JavaScript%E7%9A%84%E6%89%A7%E8%A1%8C%E7%8E%AF%E5%A2%83%E5%92%8C%E6%A0%88%EF%BC%88What%20is%20the%20Execution%20Context%20&%20Stack%20in%20JavaScript%EF%BC%89/
            get () {
              return this.value
            },
            set (val) {
              this.$emit('input', val)
            }
          }
        }
      },
      'lbs-select-input-type': {
        props: ['value'],
        computed: {
          value_: {
            get () {
              return this.value
            },
            set (val) {
              this.$emit('input', val)
            }
          }
        },
        template: `
          <a-select v-model="value_" placeholder="类型">
            <a-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </a-option>
          </a-select>
        `,
        data: () => ({
          options: [
            {
              label: '文字',
              value: 'text'
            },
            {
              label: '密码',
              value: 'password'
            },
            {
              label: '日期',
              value: 'date'
            },
            {
              label: '邮箱',
              value: 'email'
            },
            {
              label: '手机号',
              value: 'tel'
            }
          ]
        })
      }
    }
  }
}
