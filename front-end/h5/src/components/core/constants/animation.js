// #!zh: 可选的动画列表的第一个层级
export const firstLevelAnimationOptions = [
  {
    label: '进入',
    value: /进/
  },
  {
    label: '退出',
    value: /退/
  },
  {
    label: '强调',
    value: /强调|特殊/
  }
]

export const animationOptions = [
  {
    label: '',
    value: '空',
    children: [
      {
        label: '无',
        value: ''
      }
    ]
  },
  {
    label: '强调',
    value: 'Attention Seekers',
    children: [
      {
        label: '旋转',
        value: 'justRotate'
      }, {
        label: '弹跳',
        value: 'bounce'
      },
      {
        label: '闪烁',
        value: 'flash'
      },
      {
        label: '跳动',
        value: 'pulse'
      },
      {
        label: '抖动',
        value: 'shake'
      },
      {
        label: '摇摆',
        value: 'swing'
      },
      {
        label: '橡皮圈',
        value: 'rubberBand'
      },
      {
        label: '果冻',
        value: 'jello'
      },
      {
        label: '',
        value: 'tada'
      },
      {
        label: '',
        value: 'wobble'
      }
    ]
  },

  {
    label: '弹跳进入',
    value: 'Bouncing Entrances',
    children: [{
      label: '弹跳进入',
      value: 'bounceIn'
    },
    {
      label: '向下弹跳进入',
      value: 'bounceInDown'
    },
    {
      label: '向右弹跳进入',
      value: 'bounceInLeft'
    },
    {
      label: '向左弹跳进入',
      value: 'bounceInRight'
    },
    {
      label: '向上弹跳进入',
      value: 'bounceInUp'
    }
    ]
  },

  {
    label: '弹跳退出',
    value: 'Bouncing Exits',
    children: [{
      label: '弹跳退出',
      value: 'bounceOut'
    },
    {
      label: '向下弹跳退出',
      value: 'bounceOutDown'
    },
    {
      label: '向左弹跳退出',
      value: 'bounceOutLeft'
    },
    {
      label: '向右弹跳退出',
      value: 'bounceOutRight'
    },
    {
      label: '向上弹跳退出',
      value: 'bounceOutUp'
    }
    ]
  },

  {
    label: '渐显进入',
    value: 'Fading Entrances',
    children: [
      {
        label: '渐显进入',
        value: 'fadeIn'
      },
      {
        label: '向下渐显进入',
        value: 'fadeInDown'
      },
      {
        label: '由屏幕外向下渐显进入',
        value: 'fadeInDownBig'
      },
      {
        label: '向右显进入',
        value: 'fadeInLeft'
      },
      {
        label: '由屏幕外向右渐显进入',
        value: 'fadeInLeftBig'
      },
      {
        label: '向左渐显进入',
        value: 'fadeInRight'
      },
      {
        label: '由屏幕外向左渐显进入',
        value: 'fadeInRightBig'
      },
      {
        label: '向上渐显进入',
        value: 'fadeInUp'
      },
      {
        label: '由屏幕外向上渐显进入',
        value: 'fadeInUpBig'
      }
    ]
  },

  {
    label: '渐隐退出',
    value: 'Fading Exits',
    children: [
      {
        label: '渐隐退出',
        value: 'fadeOut'
      },
      {
        label: '向下渐隐退出',
        value: 'fadeOutDown'
      },
      {
        label: '向下渐隐退出屏幕外',
        value: 'fadeOutDownBig'
      },
      {
        label: '向左渐隐退出',
        value: 'fadeOutLeft'
      },
      {
        label: '向左渐隐退出屏幕外',
        value: 'fadeOutLeftBig'
      },
      {
        label: '向右渐隐退出',
        value: 'fadeOutRight'
      },
      {
        label: '向右渐隐退出屏幕外',
        value: 'fadeOutRightBig'
      },
      {
        label: '向上渐隐退出',
        value: 'fadeOutUp'
      },
      {
        label: '向上渐隐退出屏幕外',
        value: 'fadeOutUpBig'
      }
    ]
  },

  {
    label: '翻动',
    value: 'Flippers',
    children: [{
      label: '翻动',
      value: 'flip'
    },
    {
      label: '纵向翻动',
      value: 'flipInX'
    },
    {
      label: '横向翻动',
      value: 'flipInY'
    },
    {
      label: '立体纵向翻动',
      value: 'flipOutX'
    },
    {
      label: '立体横向翻动',
      value: 'flipOutY'
    }
    ]
  },

  {
    label: '加速进出',
    value: 'Lightspeed',
    children: [{
      label: '加速进入',
      value: 'lightSpeedIn'
    },
    {
      label: '加速退出',
      value: 'lightSpeedOut'
    }
    ]
  },

  {
    label: '旋转渐显',
    value: 'Rotating Entrances',
    children: [{
      label: '旋转渐显',
      value: 'rotateIn'
    },
    {
      label: '左下角旋转渐显',
      value: 'rotateInDownLeft'
    },
    {
      label: '旋转渐显',
      value: '右下角rotateInDownRight'
    },
    {
      label: '左上角旋转渐显',
      value: 'rotateInUpLeft'
    },
    {
      label: '右上角旋转渐显',
      value: 'rotateInUpRight'
    }
    ]
  },

  {
    label: '旋转渐隐',
    value: 'Rotating Exits',
    children: [
      {
        label: '旋转渐隐',
        value: 'rotateOut'
      },
      {
        label: '左下角旋转渐隐',
        value: 'rotateOutDownLeft'
      },
      {
        label: '左下角旋转渐隐',
        value: 'rotateOutDownRight'
      },
      {
        label: '左上角旋转渐隐',
        value: 'rotateOutUpLeft'
      },
      {
        label: '右上角旋转渐隐',
        value: 'rotateOutUpRight'
      }
    ]
  },

  {
    label: '平移进入',
    value: 'Sliding Entrances',
    children: [{
      label: '向上平移进入',
      value: 'slideInUp'
    },
    {
      label: '向下平移进入',
      value: 'slideInDown'
    },
    {
      label: '向右平移进入',
      value: 'slideInLeft'
    },
    {
      label: '向左平移进入',
      value: 'slideInRight'
    }

    ]
  },
  {
    label: '平移退出',
    value: 'Sliding Exits',
    children: [{
      label: '向上平移退出',
      value: 'slideOutUp'
    },
    {
      label: '向下平移退出',
      value: 'slideOutDown'
    },
    {
      label: '向左平移退出',
      value: 'slideOutLeft'
    },
    {
      label: '向右平移退出',
      value: 'slideOutRight'
    }
    ]
  },

  {
    label: '放大进入',
    value: 'Zoom Entrances',
    children: [{
      label: '放大进入',
      value: 'zoomIn'
    },
    {
      label: '向下放大进入',
      value: 'zoomInDown'
    },
    {
      label: '向右放大进入',
      value: 'zoomInLeft'
    },
    {
      label: '向左放大进入',
      value: 'zoomInRight'
    },
    {
      label: '向上放大进入',
      value: 'zoomInUp'
    }
    ]
  },

  {
    label: '缩小退出',
    value: 'Zoom Exits',
    children: [{
      label: '缩小退出',
      value: 'zoomOut'
    },
    {
      label: '向下缩小退出',
      value: 'zoomOutDown'
    },
    {
      label: '向左缩小退出',
      value: 'zoomOutLeft'
    },
    {
      label: '向右缩小退出',
      value: 'zoomOutRight'
    },
    {
      label: '向上缩小退出',
      value: 'zoomOutUp'
    }
    ]
  },

  {
    label: '特殊效果',
    value: 'Specials',
    children: [
      {
        label: '悬挂',
        value: 'hinge'
      },
      {
        label: '滚动进入',
        value: 'rollIn'
      },
      {
        label: '滚动退出',
        value: 'rollOut'
      }
    ]
  }
]

/**
 * @return {Object} { animationValue: animatonLabel }
 */
export const animationValue2Name = animationOptions.reduce((obj, curr) => {
  const items = curr.children
  items.forEach(item => { obj[item.value] = item.label })
  return obj
}, {})
