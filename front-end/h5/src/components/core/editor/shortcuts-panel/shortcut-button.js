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
      type: Function
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { props, listeners, slots }) => {
    const onClick = props.clickFn || function () {}
    return (
      <a-button
        class="shortcut-button"
        onClick={onClick}
        disabled={props.disabled}
      >
        <i
          class={['shortcut-icon', 'fa', `fa-${props.faIcon}`]}
          aria-hidden='true'
        />
        <span>{ props.title }</span>
      </a-button>
    )
  }
}
