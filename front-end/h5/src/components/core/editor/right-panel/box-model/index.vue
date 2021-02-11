<template>
  <div v-if="editingElement" class="box-model">
    <div v-if="boxModelPart" class="prompt">设置 {{ boxModelPart }}</div>
    <div v-else>选择 margin/border/padding 进行设置</div>
    <PositionCheckbox label="上" label-key="top" />
    <div class="middle">
      <PositionCheckbox label="左" label-key="left" />
      <div ref="margin" class="margin" data-type="margin" :class="{'margin-select':boxModelPart === 'margin'}" @click="onBoxModelClick">
        margin
        <div ref="border" class="border" data-type="border" :class="{'border-select':boxModelPart === 'border'}">
          border
          <div ref="padding" class="padding" data-type="padding" :class="{'padding-select':boxModelPart === 'padding'}">
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
    <div v-if="isEditingBorder" style="margin: 20px;">
      <span> 设置border-color </span>
      <el-color-picker size="small" :value="borderColor" @change="onColorChange"/>
    </div>
  </div>
</template>

<script>
  // 盒子模型编辑器
  import { mapState, mapActions } from 'vuex'
  import PositionCheckbox from './position-checkbox'
  export default {
    name: 'BoxModelEditor',
    components: {
      PositionCheckbox
    },
    data () {
      return {
        lastSelect: '',
        select: ''
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
        const type = target.dataset.type
        this.setElementPosition({
          boxModelPart: type
        })
      },
      onColorChange (color) {
        const boxModelPart = this.boxModelPart
        // 取出 commonStyle.border,并更改 border.color.value 的值
        const boxModelPartStyle = this.editingElement.commonStyle[boxModelPart]
         Object.assign(boxModelPartStyle.color, { value: color })
         // TODO 收归style至commonStyle，而非pluginProps
         if (boxModelPart === 'border') {
           this.editingElement.pluginProps.borderColor = color
         }
         this.setElementPosition({ [boxModelPart]: boxModelPartStyle })
      }
    }
  }
</script>

<style lang='less' scoped>
.box-model {
  margin: 8px 0;
  border-top: 1px dashed #eee;
  border-bottom: 1px dashed #eee;
}
.inline-block{
  display:inline-block;
  text-align: center;
}
.common{
  .inline-block();
  background-color:#52527e;
  &-select{
    background-color: #fedd9b;
  }
}
.middle{
  margin:12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  border: 1px solid #fff;
  background-color: rgb(82, 82, 126);
  width:80%;
  .inline-block()
}
</style>
