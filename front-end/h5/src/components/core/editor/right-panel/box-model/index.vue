<template>
  <div v-if="editingElement" class="box-model">
    <div v-if="boxModelPart" class="prompt">设置 {{ boxModelPart }}</div>
    <div v-else>选择 margin/border/padding 进行设置</div>
    <PositionCheckbox label="上" label-key="top" />
    <div class="middle">
      <PositionCheckbox label="左" label-key="left" />
      <div ref="margin" class="margin" data-type="margin"  @click="onBoxModelClick">
        margin
        <div ref="border" class="border" data-type="border">
          border
          <div ref="padding" class="padding" data-type="padding">
            padding
            <div class="content"  data-type="padding">
              {{ commonStyle.width | digit }} x {{ commonStyle.height | digit }}
            </div>
          </div>
        </div>
      </div>
      <PositionCheckbox label="右" label-key="right" />
    </div>
    <PositionCheckbox label="下" label-key="bottom" />
    <template v-if="isEditingBorder">
      <div> 设置border-color </div>
      <el-color-picker size="small" :value="borderColor" @change="onColorChange"/>
    </template>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import PositionCheckbox from './position-checkbox'
  export default {
    name: 'BoxModel',
    components: {
      PositionCheckbox
    },
    data () {
      return {
        lastSelect: ''
      }
    },
    computed: {
      ...mapState('editor', {
        editingElement: state => state.editingElement
      }),
      boxModelPart () {
        return this.editingElement && this.editingElement.commonStyle.boxModelPart
      },
      commonStyle () {
        return this.editingElement ? this.editingElement.commonStyle : {}
      },
      borderColor () {
        return this.commonStyle ? this.commonStyle.border.color.value : ''
      },
      isEditingBorder () {
        return this.boxModelPart === 'border'
      }
    },
    filters: {
      digit (val) {
        return val.toFixed(0)
      }
    },
    methods: {
      ...mapActions('editor', [
        'setElementPosition'
      ]),
      onBoxModelClick (e) {
        const target = e.target
        const classList = target.classList
        const type = target.dataset.type
        const selectClass = type + '-select'
        // 更新选中的 boxModelPart，用于判断当前设置的是 margin / border / padding
        this.setElementPosition({
          boxModelPart: type
        })
        if (this.lastSelect && type !== this.lastSelect) {
          this.$refs[this.lastSelect].classList.remove(this.lastSelect + '-select')
        }
        // 选中的元素添加上选中的 className
        if (!classList.contains(selectClass)) {
          this.$refs[type].classList.add(selectClass)
          this.lastSelect = type
        }
      },
      onColorChange (color) {
        this.changeCommonStyle(color, 'color')
      },
      changeCommonStyle (changeValue, labelKey, key = 'value') {
         const boxModelPart = this.boxModelPart
        // 例如 boxModelPart 为 margin 时候
        const boxModelPartStyle = this.editingElement.commonStyle[boxModelPart]
        // 更新值例如: padding-top
        Object.assign(boxModelPartStyle[labelKey], { [key]: changeValue })
        this.setElementPosition({ [boxModelPart]: boxModelPartStyle })
      }
    },
    watch: {
      /**
       * 监听当前是否有选中的组件，如果有判断之前是否保存了 boxModelPart
       * 如果保存了就将之前编辑状态重新复原。
       */
      editingElement: {
        immediate: true,
        handler (val) {
          if (!this.boxModelPart) return
          const selectClass = this.boxModelPart + '-select'
          this.$nextTick(() => {
            this.$refs[this.boxModelPart].classList.add(selectClass)
            this.lastSelect = this.boxModelPart
          })
        }
      }
    }
  }
</script>

<style lang='less' scoped>
.inline-block{
  display:inline-block;
  text-align: center;
}
.common{
  .inline-block();
  background-color:rgb(15, 14, 14);
  &-select{
    background-color: rgb(170, 170, 95);
  }
}
.middle{
  margin:20px 0;
  display: flex;
  align-items: center;
}
.margin{
  width:150px;
  height: 110px;
  border:1px dashed #fff;
  color: #fff;
  font-size:12px;
  flex-shrink: 0;
  .common()
}
.border{
  width:120px;
  height: 80px;
  border:1px solid #fff;
  .common()
}
.padding{
  border:1px dashed #fff;
  width:90px;
  height: 50px;
  .common()
}
.content{
  background-color: rgb(82, 82, 126);
  width:80%;
  .inline-block()
}
</style>
