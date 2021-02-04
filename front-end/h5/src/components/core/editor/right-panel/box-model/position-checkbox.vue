<template>
  <div class="position-checkbox">
    <!-- 只有选中 padding border margin 之后才会显示 -->
    <template v-if="boxModelPart">
      <div class="flex">
        <a-checkbox @change="onCheckboxChange" :checked="isChecked">
        </a-checkbox>
        <div class="label">{{label}}</div>
      </div>

    </template>
    <template v-if="boxModelPart && isChecked">
      <a-input-number style="width:70px" :value="value" :min="0" @change="onInputNumberChange" />
      <a-select :value="unit" style="width:70px" @change="onUnitChange">
        <a-select-option v-for="(item,index) in unitList" :key="index" :value="item">
          {{ item }}
        </a-select-option>
      </a-select>
    </template>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    name: 'PositionCheckbox',
    props: {
      label: {
        type: String,
        default: ''
      },
      labelKey: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isChecked: false
      }
    },
    computed: {
      ...mapState('editor', {
        editingElement: state => state.editingElement
      }),
      boxModelPart () {
        return this.editingElement && this.editingElement.commonStyle.boxModelPart
      },
      value () {
        const { editingElement, labelKey, boxModelPart } = this
        return this.boxModelPart ? editingElement.commonStyle[boxModelPart][labelKey].value : ''
      },
      unit () {
        const { editingElement, labelKey, boxModelPart } = this
        return this.boxModelPart ? editingElement.commonStyle[boxModelPart][labelKey].unit : ''
      },
      unitList () {
        return this.boxModelPart === 'border' ? ['px', 'em'] : ['px', '%', 'em']
      }
    },
    methods: {
      ...mapActions('editor', [
        'setElementPosition'
      ]),
      onUnitChange (unit) {
        this.changeCommonStyle(unit, 'unit')
      },
      onCheckboxChange (e) {
        this.isChecked = e.target.checked
      },
      onInputNumberChange (value) {
        this.changeCommonStyle(value)
      },
      changeCommonStyle (changeValue, key = 'value') {
         const boxModelPart = this.boxModelPart
        // 例如 boxModelPart 为 margin 时候
        const boxModelPartStyle = this.editingElement.commonStyle[boxModelPart]
        // 更新值例如: padding-top
        Object.assign(boxModelPartStyle[this.labelKey], { [key]: changeValue })
        this.setElementPosition({ [boxModelPart]: boxModelPartStyle })
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (val) {
          if (val) {
            this.isChecked = true
          }
        }
      }
    }
  }
</script>

<style lang='less' scoped>
.flex{
  display: flex;
  align-items: center;
}
.position-checkbox{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.label{
  margin:0 10px;
}
</style>
