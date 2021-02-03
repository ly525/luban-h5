<template>
  <div class="position-checkbox">
    <div class="flex">
      <a-checkbox @change="onCheckboxChange">
      </a-checkbox>
      <div class="label">{{label}}</div>
    </div>
    <a-input-number style="width:70px" v-model="value" :min="0" @change="onInputNumberChange" />
    <a-select default-value="px" style="width:70px">
      <a-select-option value="px">
        px
      </a-select-option>
      <a-select-option value="%">
        %
      </a-select-option>
      <a-select-option value="em">
        em
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
  export default {
    name: 'PositionCheckbox',
    props: {
      label: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        value: 1
      }
    },

    methods: {
      onCheckboxChange () {},
      onInputNumberChange () {}
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
