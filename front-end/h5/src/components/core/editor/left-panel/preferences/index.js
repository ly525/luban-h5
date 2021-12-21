import langMixin from 'core/mixins/i18n'
import LocalPreferences, { IS_CONFIRM_BEFORE_DELETE_ELEMENT } from './local-preferences'

export default {
  mixins: [langMixin],
  data: () => ({
    form: {
      [IS_CONFIRM_BEFORE_DELETE_ELEMENT]: false // 删除元素前需要确认
    }
  }),
  methods: {
    handleChange (key, value) {
      switch (key) {
        case IS_CONFIRM_BEFORE_DELETE_ELEMENT:
          this[IS_CONFIRM_BEFORE_DELETE_ELEMENT] = value
          LocalPreferences.set(key, value)
          break
        default:
          break
      }
    }
  },
  render (h) {
    return (
      <a-form layout="horizontal">
        <a-form-model-item label="删除元素前需要确认">
          <a-switch value={this.form[IS_CONFIRM_BEFORE_DELETE_ELEMENT]} onChange={val => this.handleChange(IS_CONFIRM_BEFORE_DELETE_ELEMENT, val)} />
        </a-form-model-item>
      </a-form>
    )
  }
}
