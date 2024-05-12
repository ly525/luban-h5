<!--
 * @Descripttion: 
 * @Author: kcz
 * @Date: 2021-05-02 16:04:02
 * @LastEditors: kcz
 * @LastEditTime: 2021-05-14 21:24:50
-->
<template>
  <a-form-item
    :label="record.label"
    :label-col="
      formConfig.layout === 'horizontal'
        ? formConfig.labelLayout === 'flex'
          ? { style: `width:${formConfig.labelWidth}px` }
          : formConfig.labelCol
        : {}
    "
    :wrapper-col="
      formConfig.layout === 'horizontal'
        ? formConfig.labelLayout === 'flex'
          ? { style: 'width:auto;flex:1' }
          : formConfig.wrapperCol
        : {}
    "
    :style="
      formConfig.layout === 'horizontal' && formConfig.labelLayout === 'flex'
        ? { display: 'flex' }
        : {}
    "
  >
    <component
      :record="record"
      :style="`width:${record.options.width}`"
      @change="handleChange"
      :disabled="disabled"
      :dynamicData="dynamicData"
      :height="
        typeof record.options.height !== 'undefined'
          ? record.options.height
          : ''
      "
      v-decorator="[
        record.model,
        {
          initialValue: record.options.defaultValue,
          rules: record.rules
        }
      ]"
      :is="customComponent"
    ></component>
  </a-form-item>
</template>
<script>
export default {
  name: "customComponent",
  props: ["record", "formConfig", "disabled", "dynamicData"],
  computed: {
    customComponent() {
      // 计算需要显示的组件
      const customComponentList = {};
      if (window.$customComponentList) {
        // 将数组映射成json
        window.$customComponentList.forEach(item => {
          customComponentList[item.type] = item.component;
        });
      }
      return customComponentList[this.record.type];
    }
  },
  methods: {
    handleChange(value, key) {
      this.$emit("change", value, key);
    }
  }
};
</script>
