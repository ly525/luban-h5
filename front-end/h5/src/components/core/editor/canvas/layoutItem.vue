<template>
  <div
    :class="{
      'layout-width': ['grid', 'table', 'card', 'divider', 'html'].includes(
        record.type
      )
    }"
  >
    <!-- 动态表格设计模块 start -->
    <template v-if="record.type === 'batch'">
      <div
        class="batch-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <a-form-item
          :label="!record.options.showLabel ? '' : record.label"
          :label-col="
            config.layout === 'horizontal' && record.options.showLabel
              ? config.labelLayout === 'flex'
                ? { style: `width:${config.labelWidth}px` }
                : config.labelCol
              : {}
          "
          :wrapper-col="
            config.layout === 'horizontal' && record.options.showLabel
              ? config.labelLayout === 'flex'
                ? { style: 'width:auto;flex:1' }
                : config.wrapperCol
              : {}
          "
          :style="
            config.layout === 'horizontal' &&
            config.labelLayout === 'flex' &&
            record.options.showLabel
              ? { display: 'flex' }
              : {}
          "
        >
          <draggable
            tag="div"
            class="draggable-box"
            v-bind="{
              group: insertAllowed ? 'form-draggable' : '',
              ghostClass: 'moving',
              animation: 180,
              handle: '.drag-move'
            }"
            v-model="record.list"
            @start="$emit('dragStart', $event, record.list)"
            @add="$emit('handleColAdd', $event, record.list)"
          >
            <transition-group tag="div" name="list" class="list-main">
              <formNode
                v-for="item in record.list"
                :key="item.key"
                class="drag-move"
                :selectItem.sync="selectItem"
                :record="item"
                :hideModel="hideModel"
                :config="config"
                @handleSelectItem="handleSelectItem"
                @handleColAdd="handleColAdd"
                @handleCopy="$emit('handleCopy')"
                @handleShowRightMenu="handleShowRightMenu"
                @handleDelete="$emit('handleDelete')"
              />
            </transition-group>
          </draggable>
        </a-form-item>
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
    <!-- 动态表格设计模块 end -->
    <!-- 选择输入列 start -->
    <template v-else-if="record.type === 'selectInputList'">
      <div
        class="select-input-list-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <a-form-item
          :label="!record.options.showLabel ? '' : record.label"
          :label-col="
            config.layout === 'horizontal' && record.options.showLabel
              ? config.labelLayout === 'flex'
                ? { style: `width:${config.labelWidth}px` }
                : config.labelCol
              : {}
          "
          :wrapper-col="
            config.layout === 'horizontal' && record.options.showLabel
              ? config.labelLayout === 'flex'
                ? { style: 'width:auto;flex:1' }
                : config.wrapperCol
              : {}
          "
          :style="
            config.layout === 'horizontal' &&
            config.labelLayout === 'flex' &&
            record.options.showLabel
              ? { display: 'flex' }
              : {}
          "
        >
          <div
            class="column-box"
            v-for="(column, index) in record.columns"
            :key="index"
          >
            <div class="check-box">
              <a-checkbox v-if="record.options.multiple" disabled>
                {{ column.label }}
              </a-checkbox>
              <a-radio-group v-else disabled name="radio">
                <a-radio :value="column.value">{{ column.label }}</a-radio>
              </a-radio-group>
            </div>
            <draggable
              tag="div"
              class="draggable-box"
              v-bind="{
                group: insertAllowed ? 'form-draggable' : '',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move'
              }"
              v-model="column.list"
              @start="$emit('dragStart', $event, column.list)"
              @add="$emit('handleColAdd', $event, column.list)"
            >
              <transition-group tag="div" name="list" class="list-main">
                <formNode
                  v-for="item in column.list"
                  :key="item.key"
                  class="drag-move"
                  :selectItem.sync="selectItem"
                  :record="item"
                  :hideModel="hideModel"
                  :config="config"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleShowRightMenu="handleShowRightMenu"
                  @handleDelete="$emit('handleDelete')"
                />
              </transition-group>
            </draggable>
          </div>
        </a-form-item>
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
    <!-- 选择输入列 end -->
    <!-- 标签Tabs布局 start -->
    <template v-else-if="record.type === 'tabs'">
      <div
        class="grid-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <a-tabs
          class="grid-row"
          :default-active-key="0"
          :tabBarGutter="record.options.tabBarGutter || null"
          :type="record.options.type"
          :size="record.options.size"
          :tabPosition="record.options.tabPosition"
          :animated="record.options.animated"
        >
          <a-tab-pane
            v-for="(tabItem, index) in record.columns"
            :key="index"
            :tab="tabItem.label"
          >
            <div class="grid-col">
              <draggable
                tag="div"
                class="draggable-box"
                v-bind="{
                  group: 'form-draggable',
                  ghostClass: 'moving',
                  animation: 180,
                  handle: '.drag-move'
                }"
                v-model="tabItem.list"
                @start="$emit('dragStart', $event, tabItem.list)"
                @add="$emit('handleColAdd', $event, tabItem.list)"
              >
                <transition-group tag="div" name="list" class="list-main">
                  <layoutItem
                    class="drag-move"
                    v-for="item in tabItem.list"
                    :key="item.key"
                    :selectItem.sync="selectItem"
                    :startType="startType"
                    :insertAllowedType="insertAllowedType"
                    :record="item"
                    :hideModel="hideModel"
                    :config="config"
                    @handleSelectItem="handleSelectItem"
                    @handleColAdd="handleColAdd"
                    @handleCopy="$emit('handleCopy')"
                    @handleShowRightMenu="handleShowRightMenu"
                    @handleDelete="$emit('handleDelete')"
                  />
                </transition-group>
              </draggable>
            </div>
          </a-tab-pane>
        </a-tabs>

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
    <!-- 标签Tabs布局 end -->
    <!-- 栅格布局 start -->
    <template v-else-if="record.type === 'grid'">
      <div
        class="grid-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <a-row class="grid-row" :gutter="record.options.gutter">
          <a-col
            class="grid-col"
            v-for="(colItem, idnex) in record.columns"
            :key="idnex"
            :span="colItem.span || 0"
          >
            <draggable
              tag="div"
              class="draggable-box"
              v-bind="{
                group: 'form-draggable',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move'
              }"
              v-model="colItem.list"
              @start="$emit('dragStart', $event, colItem.list)"
              @add="$emit('handleColAdd', $event, colItem.list)"
            >
              <transition-group tag="div" name="list" class="list-main">
                <layoutItem
                  class="drag-move"
                  v-for="item in colItem.list"
                  :key="item.key"
                  :selectItem.sync="selectItem"
                  :startType="startType"
                  :insertAllowedType="insertAllowedType"
                  :record="item"
                  :hideModel="hideModel"
                  :config="config"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleShowRightMenu="handleShowRightMenu"
                  @handleDelete="$emit('handleDelete')"
                />
              </transition-group>
            </draggable>
          </a-col>
        </a-row>

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
    <!-- 栅格布局 end -->
    <!-- 卡片布局 start -->
    <template v-else-if="record.type === 'card'">
      <div
        class="grid-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <a-card class="grid-row" :title="record.label">
          <div class="grid-col">
            <draggable
              tag="div"
              class="draggable-box"
              v-bind="{
                group: 'form-draggable',
                ghostClass: 'moving',
                animation: 180,
                handle: '.drag-move'
              }"
              v-model="record.list"
              @start="$emit('dragStart', $event, record.list)"
              @add="$emit('handleColAdd', $event, record.list)"
            >
              <transition-group tag="div" name="list" class="list-main">
                <layoutItem
                  class="drag-move"
                  v-for="item in record.list"
                  :key="item.key"
                  :selectItem.sync="selectItem"
                  :startType="startType"
                  :insertAllowedType="insertAllowedType"
                  :record="item"
                  :hideModel="hideModel"
                  :config="config"
                  @handleSelectItem="handleSelectItem"
                  @handleColAdd="handleColAdd"
                  @handleCopy="$emit('handleCopy')"
                  @handleShowRightMenu="handleShowRightMenu"
                  @handleDelete="$emit('handleDelete')"
                />
              </transition-group>
            </draggable>
          </div>
        </a-card>

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
    <!-- 卡片布局 end -->
    <!-- 表格布局 start -->
    <template v-else-if="record.type === 'table'">
      <div
        class="table-box"
        :class="{ active: record.key === selectItem.key }"
        @click.stop="handleSelectItem(record)"
      >
        <table
          class="table-layout kk-table-9136076486841527"
          :class="{
            bright: record.options.bright,
            small: record.options.small,
            bordered: record.options.bordered
          }"
          :style="record.options.customStyle"
        >
          <tr v-for="(trItem, trIndex) in record.trs" :key="trIndex">
            <td
              class="table-td"
              v-for="(tdItem, tdIndex) in trItem.tds"
              v-show="tdItem.colspan && tdItem.rowspan"
              :key="tdIndex"
              :colspan="tdItem.colspan"
              :rowspan="tdItem.rowspan"
              @contextmenu.prevent="
                $emit('handleShowRightMenu', $event, record, trIndex, tdIndex)
              "
            >
              <draggable
                tag="div"
                class="draggable-box"
                v-bind="{
                  group: 'form-draggable',
                  ghostClass: 'moving',
                  animation: 180,
                  handle: '.drag-move'
                }"
                v-model="tdItem.list"
                @start="$emit('dragStart', $event, tdItem.list)"
                @add="$emit('handleColAdd', $event, tdItem.list)"
              >
                <transition-group tag="div" name="list" class="list-main">
                  <layoutItem
                    class="drag-move"
                    v-for="item in tdItem.list"
                    :key="item.key"
                    :selectItem.sync="selectItem"
                    :startType="startType"
                    :insertAllowedType="insertAllowedType"
                    :record="item"
                    :hideModel="hideModel"
                    :config="config"
                    @handleSelectItem="handleSelectItem"
                    @handleColAdd="handleColAdd"
                    @handleCopy="$emit('handleCopy')"
                    @handleShowRightMenu="handleShowRightMenu"
                    @handleDelete="$emit('handleDelete')"
                  />
                </transition-group>
              </draggable>
            </td>
          </tr>
        </table>

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
    <!-- 表格布局 end -->
    <template v-else>
      <formNode
        :key="record.key"
        :selectItem.sync="selectItem"
        :record="record"
        :config="config"
        :hideModel="hideModel"
        @handleSelectItem="handleSelectItem"
        @handleCopy="$emit('handleCopy')"
        @handleDelete="$emit('handleDelete')"
        @handleShowRightMenu="$emit('handleShowRightMenu')"
      />
    </template>
  </div>
</template>
<script>
/*
 * author kcz
 * date 2019-11-20
 * description 使用递归组件调用自己，生成布局结构及表单
 */
import draggable from 'vuedraggable'
import formNode from './formNode'
export default {
  name: 'layoutItem',
  props: {
    record: {
      type: Object,
      required: true
    },
    selectItem: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    startType: {
      type: String,
      required: true
    },
    insertAllowedType: {
      type: Array,
      required: true
    },
    hideModel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    insertAllowed () {
      return this.insertAllowedType.includes(this.startType)
    }
  },
  components: {
    formNode,
    draggable
  },
  methods: {
    handleShowRightMenu (e, record, trIndex, tdIndex) {
      this.$emit('handleShowRightMenu', e, record, trIndex, tdIndex)
    },
    handleSelectItem (record) {
      this.$emit('handleSelectItem', record)
    },
    handleColAdd (e, list) {
      this.$emit('handleColAdd', e, list)
    }
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
