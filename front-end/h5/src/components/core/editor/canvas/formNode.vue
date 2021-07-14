<!--
 * @Description: 将数据通过k-form-item组件解析，生成控件
 * @Author: kcz
 * @Date: 2019-12-30 00:37:05
 * @LastEditTime: 2021-05-27 15:19:02
 * @LastEditors: kcz
 * @FilePath: \k-form-design\packages\KFormDesign\module\formNode.vue
 -->
<template>
  <div
    class="drag-move-box"
    @click.stop="$emit('handleSelectItem', record)"
    :class="{ active: record.key === selectItem.key }"
  >
    <div class="form-item-box">
      <kFormItem :formConfig="config" :record="record" />
    </div>
    <div
      v-if="!hideModel"
      class="show-key-box"
      v-text="record.label + (record.model ? '/' + record.model : '')"
    />
    <div
      class="action-icon copy"
      :class="record.key === selectItem.key ? 'active' : 'unactivated'"
      @click.stop="$emit('handleCopy')"
    >
      <a-icon type="copy" />
    </div>
    <div
      class="action-icon delete"
      :class="record.key === selectItem.key ? 'active' : 'unactivated'"
      @click.stop="$emit('handleDelete')"
    >
      <a-icon type="delete" />
    </div>
  </div>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 通过json生成的单个表单节点
 */
import kFormItem from './KFormItem/index'
export default {
  props: {
    record: {
      type: Object,
      required: true
    },
    selectItem: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      required: true
    },
    hideModel: {
      type: Boolean,
      default: false
    }
  },
  components: {
    kFormItem
  }
}
</script>

<style lang="scss" scoped>
.action-icon {
  position: absolute;
  top: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  /* color: #fff; */
  z-index: 989;
  -webkit-transition: all .3s;
  transition: all .3s;
  &.delete {
    right: 0;
  }
  &.copy {
    right: 30px;
  }
}
</style>
