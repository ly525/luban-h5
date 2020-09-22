import Vue from 'vue'

Vue.directive('hover', {
  bind: function (el, binding, vNode) {
    // Provided expression must evaluate to an object.
    const compName = vNode.context.name
    if (typeof binding.value !== 'object') {
      let warn = `[v-hover]: provided expression '${binding.expression}' is not an object, but it needs to be.`
      if (compName) { warn += `\nFound in component '${compName}'` }
      console.warn(warn)
    }
    if (!binding.value.over && !binding.value.leave) {
      let warn = `[v-hover]: object provided does not have 'over' or 'leave' properties. Needs at least one to be of use`
      if (compName) { warn += `\nFound in component '${compName}'` }
      console.warn(warn)
    }
    el.__vHoverOver__ = binding.value.over || (() => {})
    el.__vHoverLeave__ = binding.value.leave || (() => {})

    // Add Event Listeners
    el.addEventListener('mouseover', el.__vHoverOver__)
    el.addEventListener('mouseleave', el.__vHoverLeave__)
  },
  unbind: function (el, binding) {
    // Remove Event Listeners
    el.removeEventListener('mouseover', el.__vHoverOver__)
    el.removeEventListener('mouseleave', el.__vHoverLeave__)
    delete el.__vHoverOver__
    delete el.__vHoverLeave__
  }
})

Vue.directive('drag', {
  bind: function (el, binding, vNode) {
    // Provided expression must evaluate to an object.
    const compName = vNode.context.name
    if (typeof binding.value !== 'object') {
      let warn = `[v-drag]: provided expression '${binding.expression}' is not an object, but it needs to be.`
      if (compName) { warn += `\nFound in component '${compName}'` }
      console.warn(warn)
    }
    if (!binding.value.start && !binding.value.end) {
      let warn = `[v-drag]: object provided does not have 'start' or 'end' properties. Needs at least one to be of use`
      if (compName) { warn += `\nFound in component '${compName}'` }
      console.warn(warn)
    }

    let startY = 0
    let startX = 0
    el.__vDragInit__ = (e) => {
      e.stopPropagation()
      if (typeof binding.value.init === 'function') {
        binding.value.init()
      }
      startY = e.clientY
      startX = e.clientX
      el.addEventListener('mousemove', el.__vDragStart__)
      el.addEventListener('mouseup', el.__vDragEnd__)
    }
    el.__vDragStart__ = e => {
      console.log('__vDragStart__')
      if (typeof binding.value.start !== 'function') return
      binding.value.start(e, { offsetX: e.clientX - startX, offsetY: e.clientY - startY })
    }
    el.__vDragEnd__ = binding.value.end || ((e) => {
      el.removeEventListener('mousedown', el.__vDragInit__)
      el.removeEventListener('mousemove', el.__vDragStart__)
      el.removeEventListener('mouseup', el.__vDragEnd__)
      delete el.__vDragInit__
      delete el.__vDragStart__
      delete el.__vDragEnd__
    })

    // Add Event Listeners
    el.addEventListener('mousedown', el.__vDragInit__)
  },
  unbind: function (el, binding) {
    // Remove Event Listeners
    el.removeEventListener('mousedown', el.__vDragInit__)
    el.removeEventListener('mousemove', el.__vDragStart__)
    el.removeEventListener('mouseup', el.__vDragEnd__)
    delete el.__vDragInit__
    delete el.__vDragStart__
    delete el.__vDragEnd__
  }
})
