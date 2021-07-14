<!--
 * @Description: 表单设计器内容展示操作组件
 * @Author: kcz
 * @Date: 2019-12-31 19:39:48
 * @LastEditors: kcz
 * @LastEditTime: 2021-05-28 00:27:22
 -->
<template>
  <div class="form-panel">
    <p class="hint-text" v-show="data.list.length === 0">
      <a-empty description="从左侧选择控件添加" />
    </p>
    <a-form
      class="a-form-box k-form-build"
      :form="form"
      :layout="data.config.layout"
      :hideRequiredMark="data.config.hideRequiredMark"
      :style="data.config.customStyle"
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
        v-model="data.list"
        @add="deepClone"
        @start="dragStart($event, data.list)"
      >
        <transition-group tag="div" name="list" class="list-main">
          <layoutItem
            class="drag-move"
            v-for="record in data.list"
            :key="record.key"
            :record="record"
            :config="data.config"
            :selectItem.sync="selectItem"
            :startType="startType"
            :insertAllowedType="insertAllowedType"
            :hideModel="hideModel"
            @dragStart="dragStart"
            @handleSelectItem="handleSelectItem"
            @handleCopy="handleCopy"
            @handleDelete="handleDelete"
            @handleColAdd="handleColAdd"
            @handleShowRightMenu="handleShowRightMenu"
          />
        </transition-group>
      </draggable>
    </a-form>
    <!-- 右键菜单 start -->
    <div
      v-show="showRightMenu"
      :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
      class="right-menu"
    >
      <ul>
        <li @click="handleDownMerge"><a-icon type="caret-down" />向下合并</li>
        <li @click="handleRightMerge"><a-icon type="caret-right" />向右合并</li>
        <li @click="handleRightSplit">
          <a-icon type="border-inner" />拆分单元格
        </li>
        <li @click="handleAddCol">
          <a-icon type="border-horizontal" />增加一列
        </li>
        <li @click="handleAddRow"><a-icon type="border-verticle" />增加一行</li>
      </ul>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import layoutItem from './layoutItem'
// import 'codemirror/mode/javascript/javascript'
export default {
  name: 'KCenter',
  data () {
    return {
      form: this.$form.createForm(this),
      insertAllowedType: [
        'input',
        'textarea',
        'number',
        'select',
        'checkbox',
        'radio',
        'date',
        'time',
        'rate',
        'slider',
        'uploadFile',
        'uploadImg',
        'cascader',
        'treeSelect',
        'switch',
        'text',
        'html'
      ],
      rightMenuSelectValue: {},
      showRightMenu: false,
      menuTop: 0,
      menuLeft: 0,
      trIndex: 0,
      tdIndex: 0
    }
  },
  props: {
    noModel: {
      type: Array,
      required: true
    },
    startType: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    selectItem: {
      type: Object,
      default: () => {}
    },
    hideModel: {
      type: Boolean,
      default: false
    }
  },
  components: {
    draggable,
    layoutItem
  },
  methods: {
    deepClone (evt) {
      const newIndex = evt.newIndex
      // json深拷贝一次
      const listString = JSON.stringify(this.data.list)
      this.data.list = JSON.parse(listString)
      // 删除icon及compoent属性
      delete this.data.list[newIndex].icon
      delete this.data.list[newIndex].component
      this.$emit('handleSetSelectItem', this.data.list[newIndex])
    },
    handleColAdd (evt, columns, isCopy = false) {
      // 重置或者生成key值
      const newIndex = evt.newIndex
      const key = columns[newIndex].type + '_' + new Date().getTime()
      if (columns[newIndex].key === '' || isCopy) {
        this.$set(columns, newIndex, {
          ...columns[newIndex],
          key,
          model: key
        })
        if (this.noModel.includes(columns[newIndex].type)) {
          // 删除不需要的model属性
          delete columns[newIndex].model
        }
        if (typeof columns[newIndex].options !== 'undefined') {
          // 深拷贝options
          const optionsStr = JSON.stringify(columns[newIndex].options)
          columns[newIndex].options = JSON.parse(optionsStr)
        }
        if (typeof columns[newIndex].rules !== 'undefined') {
          // 深拷贝rules
          const rulesStr = JSON.stringify(columns[newIndex].rules)
          columns[newIndex].rules = JSON.parse(rulesStr)
        }
        if (typeof columns[newIndex].list !== 'undefined') {
          // 深拷贝list
          columns[newIndex].list = []
        }
        if (typeof columns[newIndex].columns !== 'undefined') {
          // 深拷贝columns
          const columnsStr = JSON.stringify(columns[newIndex].columns)
          columns[newIndex].columns = JSON.parse(columnsStr)
          // 复制时，清空数据
          columns[newIndex].columns.forEach(item => {
            item.list = []
          })
        }
        if (columns[newIndex].type === 'table') {
          // 深拷贝trs
          const trsStr = JSON.stringify(columns[newIndex].trs)
          columns[newIndex].trs = JSON.parse(trsStr)
          // 复制时，清空数据
          columns[newIndex].trs.forEach(item => {
            item.tds.forEach(val => {
              val.list = []
            })
          })
        }
      }
      // 深拷贝数据
      const listString = JSON.stringify(columns[newIndex])
      columns[newIndex] = JSON.parse(listString)
      this.$emit('handleSetSelectItem', columns[newIndex])
    },
    dragStart (evt, list) {
      // 拖拽结束,自动选择拖拽的控件项
      this.$emit('handleSetSelectItem', list[evt.oldIndex])
    },
    handleSelectItem (record) {
      // 修改选择Item
      this.$emit('handleSetSelectItem', record)
    },
    handleCopy (isCopy = true, data) {
      const traverse = array => {
        array.forEach((element, index) => {
          if (element.key === this.selectItem.key) {
            if (isCopy) {
              // 复制添加到选择节点后面
              array.splice(index + 1, 0, element)
            } else {
              // 双击添加到选择节点后面
              array.splice(index + 1, 0, data)
            }
            // 复制完成，重置key值
            const evt = {
              newIndex: index + 1
            }
            this.handleColAdd(evt, array, true)
            return
          }
          if (['grid', 'tabs', 'selectInputList'].includes(element.type)) {
            // 栅格布局
            element.columns.forEach(item => {
              traverse(item.list)
            })
          } else if (element.type === 'card') {
            // 卡片布局
            traverse(element.list)
          } else if (element.type === 'batch') {
            // 动态表格内复制
            if (!isCopy && !this.insertAllowedType.includes(data.type)) {
              // 插入不允许的字段时，直接return false
              return false
            }
            traverse(element.list)
          }
          if (element.type === 'table') {
            // 表格布局
            element.trs.forEach(item => {
              item.tds.forEach(val => {
                traverse(val.list)
              })
            })
          }
        })
      }
      traverse(this.data.list)
    },
    handleDelete () {
      // 删除已选择
      const traverse = array => {
        array = array.filter((element, index) => {
          if (['grid', 'tabs', 'selectInputList'].includes(element.type)) {
            // 栅格布局
            element.columns.forEach(item => {
              item.list = traverse(item.list)
            })
          }
          if (element.type === 'card' || element.type === 'batch') {
            // 卡片布局
            element.list = traverse(element.list)
          }
          if (element.type === 'table') {
            // 表格布局
            element.trs.forEach(item => {
              item.tds.forEach(val => {
                val.list = traverse(val.list)
              })
            })
          }
          if (element.key !== this.selectItem.key) {
            return true
          } else {
            if (array.length === 1) {
              this.handleSelectItem({ key: '' })
            } else if (array.length - 1 > index) {
              this.handleSelectItem(array[index + 1])
            } else {
              this.handleSelectItem(array[index - 1])
            }
            return false
          }
        })
        return array
      }

      this.data.list = traverse(this.data.list)
    },
    handleDownMerge () {
      // 向下合并

      // 判断当前行是否是最后一行，最后一行无法向下合并
      if (
        this.rightMenuSelectValue.trs.length -
          this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex]
            .rowspan <=
        this.trIndex
      ) {
        this.$message.error('当前是最后一行，无法向下合并')
        return false
      }

      // 获取当前单元格的rowspan
      const currentRowspan = this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].rowspan

      // 判断下一列单元格与当前单元格的colspan是否一致，如果不一致则无法合并
      if (
        this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan !== this.rightMenuSelectValue.trs[this.trIndex + currentRowspan].tds[this.tdIndex].colspan
      ) {
        this.$message.error('当前表格无法向下合并')
        return false
      }

      // 获取下一列单元格的rowspan
      const nextRowSpan = this.rightMenuSelectValue.trs[this.trIndex + currentRowspan].tds[this.tdIndex].rowspan

      // 当前单元格rowspan等于当前单元格rowspan加上下一列单元格rowspan
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].rowspan =
        currentRowspan + nextRowSpan

      // 将被合并的单元rowspan修改为0
      this.rightMenuSelectValue.trs[this.trIndex + currentRowspan].tds[this.tdIndex].rowspan = 0

      // 清空被合并单元格list
      this.rightMenuSelectValue.trs[this.trIndex + currentRowspan].tds[this.tdIndex].list = []
    },
    handleRightMerge () {
      // 向右合并
      // 获取当前列的所有colspan总和
      const sumCols = this.rightMenuSelectValue.trs[this.trIndex].tds
        .map(item => item.colspan)
        .reduce(function (partial, value) {
          return partial + value
        })

      // 判断是否是最后一列，最后一列无法继续向右合并
      if (
        sumCols -
          this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex]
            .colspan <=
        this.tdIndex
      ) {
        this.$message.error('当前是最后一列，无法向右合并')
        return false
      }

      // 获取当前单元格的colspan
      const currentColspan = this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan

      // 判断需要合并的单元格rowspan是否与当前单元格一致
      if (
        this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex]
          .rowspan !== this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex + currentColspan].rowspan

      ) {
        this.$message.error('当前表格无法向右合并')
        return false
      }

      // 合并单元格colspan
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan += this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex + currentColspan].colspan

      // 将被合并的单元格colspan设置为0
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex + currentColspan].colspan = 0

      // 情况被合并单元格的list
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex + currentColspan].list = []
    },
    // 拆分单元格
    handleRightSplit () {
      // 获取当前单元格的colspan及rowspan
      const { colspan, rowspan } = this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex]

      for (
        let rowIndex = this.trIndex, rowLen = this.trIndex + rowspan;
        rowIndex < rowLen;
        rowIndex++
      ) {
        for (
          let colIndex = this.tdIndex, colLen = this.tdIndex + colspan;
          colIndex < colLen;
          colIndex++
        ) {
          if (rowIndex === this.trIndex && colIndex === this.tdIndex) continue
          this.rightMenuSelectValue.trs[rowIndex].tds.splice(colIndex, 1, {
            colspan: 1,
            rowspan: 1,
            list: []
          })
        }
      }
      // 修改当前单元格colspan、rowspan为1
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].colspan = 1
      this.rightMenuSelectValue.trs[this.trIndex].tds[this.tdIndex].rowspan = 1
    },
    handleAddCol () {
      // 增加列

      this.rightMenuSelectValue.trs.forEach(item => {
        item.tds.splice(this.tdIndex + 1, 0, {
          colspan: 1,
          rowspan: 1,
          list: []
        })
      })
    },
    handleAddRow () {
      // 增加行
      // 获取总col值
      const sumCols = this.rightMenuSelectValue.trs[0].tds
        .map(item => item.colspan)
        .reduce(function (partial, value) {
          return partial + value
        })
      const rowJson = { tds: [] }
      for (let i = 0; i < sumCols; i++) {
        rowJson.tds.push({
          colspan: 1,
          rowspan: 1,
          list: []
        })
      }

      // 取当前rowspan最大值
      let maxRowSpan = 1
      this.rightMenuSelectValue.trs[this.trIndex].tds.forEach(item => {
        if (maxRowSpan < item.rowspan) {
          maxRowSpan = item.rowspan
        }
      })

      // 在rowspan最大值处插入数据
      this.rightMenuSelectValue.trs.splice(
        this.trIndex + maxRowSpan,
        0,
        rowJson
      )
    },
    handleShowRightMenu (e, val, trIndex, tdIndex) {
      // 显示右键菜单
      e.stopPropagation()
      // this.fileItem = item
      // 显示
      this.showRightMenu = true

      // 定位
      this.menuTop = e.clientY
      this.menuLeft = e.clientX
      // this.rightMenuType = type
      // this.rightId = id
      this.activeArr = [val]
      this.rightMenuSelectValue = val
      this.trIndex = trIndex
      this.tdIndex = tdIndex
      return false
    },
    handleRemoveRightMenu () {
      // 取消右键菜单
      this.showRightMenu = false
    }
  },
  mounted () {
    // 添加监听取消右键菜单
    document.addEventListener('click', this.handleRemoveRightMenu, true)
    document.addEventListener('contextmenu', this.handleRemoveRightMenu, true)
  },
  destroyed () {
    // 移除监听
    document.removeEventListener('click', this.handleRemoveRightMenu, true)
    document.removeEventListener(
      'contextmenu',
      this.handleRemoveRightMenu,
      true
    )
  }
}
</script>

<style scoped>
.form-panel .a-form-box {
  height: 100%;
}

.form-panel > .hint-text {
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 20px;
  color: #aaa;
  z-index: 16;
}
</style>
