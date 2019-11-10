export default {
  text: ({ defaultValue = '按钮', label = '按钮文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label,
      require: true
    }
  }),
  type: {
    type: String,
    default: 'text'
  },
  placeholder: ({ defaultValue = '请填写提示文字' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'a-input',
      label: '提示文字',
      require: true
    }
  }),
  required: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
    editor: {
      type: 'a-input', // lbs-color-picker
      label: '背景颜色',
      prop: {
        type: 'color'
      },
      require: true
    }
  },
  color: {
    type: String,
    default: 'black',
    editor: {
      type: 'a-input',
      label: '文字颜色',
      // !#zh 为编辑组件指定 prop
      prop: {
        type: 'color'
      },
      require: true
    }
  },
  fontSize: {
    type: Number,
    default: 14,
    editor: {
      type: 'a-input-number',
      label: '字号(px)',
      require: true,
      prop: {
        step: 1,
        min: 12,
        max: 144
      }
    }
  },
  lineHeight: {
    type: Number,
    default: 1,
    editor: {
      type: 'a-input-number',
      label: '行高',
      require: true,
      prop: {
        step: 0.1,
        min: 0.1,
        max: 10
      }
    }
  },
  borderWidth: {
    type: Number,
    default: 1,
    editor: {
      type: 'a-input-number',
      label: '边框宽度(px)',
      require: true,
      prop: {
        step: 1,
        min: 0,
        max: 10
      }
    }
  },
  borderRadius: {
    type: Number,
    default: 0,
    editor: {
      type: 'a-input-number',
      label: '圆角(px)',
      require: true,
      prop: {
        step: 0.1,
        min: 0,
        max: 200
      }
    }
  },
  borderColor: {
    type: String,
    default: '#ced4da',
    editor: {
      type: 'a-input', // lbs-color-picker
      label: '边框颜色',
      prop: {
        type: 'color'
      },
      require: true
    }
  },
  textAlign: ({ defaultValue = 'center' } = {}) => ({
    type: String,
    default: defaultValue,
    editor: {
      type: 'lbs-text-align',
      label: '文字对齐',
      require: true
    }
  })
}
