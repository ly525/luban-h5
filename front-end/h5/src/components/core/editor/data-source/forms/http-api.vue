<!--
 * @Author: ly525
 * @Date: 2020-04-06 16:23:45
 * @LastEditors: ly525
 * @LastEditTime: 2020-04-18 19:45:03
 * @FilePath: /luban-h5/front-end/h5/src/components/core/editor/data-source/forms/http-api.vue
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 -->

 <template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
  >
    <!-- {{form}} -->
    <a-form-model-item label="名称" prop="name" ref="name">
      <a-input
        v-model="form.name"
        @blur="() => $refs.name.onFieldBlur()"
      />
    </a-form-model-item>
    <a-form-model-item label="数据地址" prop="url">
      <a-input v-model="form.url" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="触发方式">
      <a-form-model-item
        prop="refreshType"
        validate-status="error"
        :style="{ display: 'inline-block', width: 'calc(50% - 4px)' }"
      >
        <a-radio-group v-model="form.refreshType">
          <a-radio value="once">单次触发</a-radio>
          <a-radio value="fixed-frequency">定时更新</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item prop="refreshInterval"  :style="{ display: 'inline-block', width: 'calc(30% - 4px)' }">
        <a-input-number v-model="form.refreshInterval" :min="1" :max="10" :disabled="form.refreshType !== 'fixed-frequency'" />
        <!-- <span class="ant-form-text">machines</span> -->
      </a-form-model-item>
    </a-form-model-item>
    <a-collapse defaultActiveKey="1" :bordered="false" style="background-color: white;" >
      <!-- <template v-slot:expandIcon="props">
        <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
      </template> -->
      <a-collapse-panel header="更多配置" key="1" style="border-bottom: none;">
        <a-form-model-item label="数据依赖" prop="region">
          <a-select v-model="form.dependencies" placeholder="please select your zone" mode="multiple">
            <a-select-option :value="item" v-for="(item, index) in dataSourceList" :key="index">{{item}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="数据处理"  >
          <codemirror v-model="form.pipe" />
        </a-form-model-item>
      </a-collapse-panel>
    </a-collapse>

    <!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="checkForm">
        Create
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        Reset
      </a-button>
    </a-form-model-item> -->
  </a-form-model>
</template>

<script>
import dataSourceFormMixin from './form-mixin'

export default {
  mixins: [dataSourceFormMixin],
  props: {
    type: {
      type: String,
      default: 'httpApi'
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      form: this.dataSource,
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a name',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: this.validateNameFromMixin
          }
        ],
        region: [
          // { required: true, message: 'Please select Activity zone', trigger: 'change' }
        ],
        date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: 'Please select activity resource', trigger: 'change' }
        ],
        url: [{ required: true, message: 'Please input api url', trigger: 'blur' }]
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      other: '',
      dataSourceList: ['dep1', 'dep2'],
      editor: null
    }
  },

  methods: {
    getForm () {
      return {
        ...this.form,
        url: this.form.url.trim(), // 移除\n\r 空格等
        handler: this.editor && this.editor.getValue() // 获取编辑器的值，编辑器没有使用 v-model 绑定
      }
    },
    checkForm () {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            resolve(this.getForm())
          } else {
            console.log('error submit!!')
            // return false
            reject(valid)
          }
        })
      })
    }
  }

}
</script>
<style>
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}
</style>
