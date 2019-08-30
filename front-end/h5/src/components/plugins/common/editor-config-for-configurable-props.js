export default {
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
  }
}
