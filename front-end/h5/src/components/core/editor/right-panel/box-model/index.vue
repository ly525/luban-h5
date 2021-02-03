<template>
  <div v-if="editingElement" class="box-model">
    <div v-if="lastSelect" class="prompt">设置 {{ lastSelect }} 大小</div>
    <div v-else>选择 margin/border/padding 设置大小</div>
    <PositionCheckbox label="上" label-key="top" />
    <div class="middle">
      <PositionCheckbox label="左" label-key="left" />
      <div ref="margin" class="margin" data-type="margin"  @click="onBoxModelClick">
        margin
        <div ref="border" class="border" data-type="border">
          border
          <div ref="padding" class="padding" data-type="padding">
            padding
          </div>
        </div>
      </div>
      <PositionCheckbox label="右" label-key="right" />
    </div>
    <PositionCheckbox label="下" label-key="bottom" />
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
      })
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
          target.classList.add(selectClass)
          this.lastSelect = type
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
.box-model{
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
</style>
