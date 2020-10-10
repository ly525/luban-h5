export default {
  functional: true,
  props: {
    faIcon: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    clickFn: {
      required: false,
      type: Function,
      default: () => {}
    },
    mousedownFn: {
      required: false,
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { props, listeners, slots }) => {
    return (
      <button
        class="shortcut-button"
        onClick={props.clickFn}
        onMousedown={props.mousedownFn}
        disabled={props.disabled}
      >
        <i
          class={['shortcut-icon', 'fa', `fa-${props.faIcon}`]}
          aria-hidden='true'
        />
        <span>{ props.title }</span>
      </button>
    )
  }
}
