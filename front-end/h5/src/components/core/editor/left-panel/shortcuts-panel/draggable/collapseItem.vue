<!--
 * @Description: 折叠组件
 * @Author: kcz
 * @Date: 2020-01-13 00:37:54
 * @LastEditors: kcz
 * @LastEditTime: 2020-03-28 11:32:39
 -->
<template>
  <draggable
    tag="ul"
    :value="list"
    v-bind="{
      group: { name: 'form-draggable', pull: 'clone', put: false },
      sort: false,
      animation: 180,
      ghostClass: 'moving'
    }"
    @start="handleStart($event, list)"
  >
    <li
      v-for="(plugin, index) in list"
      :key="index"
      @dragstart="$emit('generateKey', list, index)"
      @click="$emit('handleListPush', plugin)"
    >
    <ShortcutButton
      :title="plugin.title"
      :faIcon="plugin.icon"
      :disabled="plugin.disabled" />
    <!-- <slot scop></slot> -->
      <!-- <svg v-if="val.icon" class="icon" aria-hidden="true">
        <use :xlink:href="`#${val.icon}`"></use>
      </svg>
      {{ val.label }} -->
    </li>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
import ShortcutButton from '../shortcut-button'
export default {
  name: 'collapseItem',
  props: ['list'],
  components: {
    draggable,
    ShortcutButton
  },
  methods: {
    handleStart (e, list) {
      console.log('handleStart')
      this.$emit('start', list[e.oldIndex].name)
    }
  }
}
</script>

<style lang="less" scoped>
  // iconfont 样式
  .icon {
    width         : 1em;
    height        : 1em;
    vertical-align: -0.15em;
    fill          : currentColor;
    overflow      : hidden;
  }

//    ul {
//     padding: 5px;
//     list-style: none;
//     display: -webkit-box;
//     display: -ms-flexbox;
//     display: flex;
//     margin-bottom: 0;
//     -ms-flex-wrap: wrap;
//     flex-wrap: wrap;

//       li {
//           border-radius: 0;
//           border: 0;
//           -webkit-box-shadow: 1px 0 0 0 #ccc, 0 1px 0 0 #ccc, 1px 1px 0 0 #ccc, 1px 0 0 0 #ccc inset, 0 1px 0 0 #ccc inset;
//           box-shadow: 1px 0 0 0 #ccc, 0 1px 0 0 #ccc, 1px 1px 0 0 #ccc, inset 1px 0 0 0 #ccc, inset 0 1px 0 0 #ccc;
//           padding: 8px 12px;
//           width: calc(50% - 6px);
//           margin: 2.7px;
//           height: 36px;
//           line-height: 20px;
//           cursor: move;
//           border: 1px solid transparent;
//           border-radius: 3px;
//           -webkit-transition: all .3s;
//           transition: all .3s;
//       }
// }

</style>
