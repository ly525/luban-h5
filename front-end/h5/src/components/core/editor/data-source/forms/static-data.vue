 <template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :colon="false"
  >
    <a-form-model-item label="名称" prop="name" ref="name">
      <a-input v-model="form.name" @blur="() => {$refs.name.onFieldBlur()}" />
    </a-form-model-item>
    <a-collapse defaultActiveKey="1" :bordered="false" style="background-color: white;" >
      <a-collapse-panel header="更多配置" key="1" style="border-bottom: none;">
        <a-form-model-item label="数据依赖" prop="region">
          <a-select v-model="form.dependencies" placeholder="please select your zone" mode="multiple">
            <a-select-option :value="item" v-for="(item, index) in dataSourceList" :key="index">{{item}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="数据处理"  >
          <codemirror v-model="form.handler" />
        </a-form-model-item>
      </a-collapse-panel>
    </a-collapse>
  </a-form-model>
</template>

<script>
import dataSourceFormMixin from './form-mixin'
import { StaticDataSource } from '../model'

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
      form: new StaticDataSource({
        ...{
          refreshInterval: 2,
          refreshType: 'once',
          type: this.type
        },
        ...this.dataSource
      }),
      rules: {
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' }
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
      dataSourceList: ['ds1'],
      editor: null
    }
  },
  methods: {
    getForm () {
      return {
        ...this.form,
        // url: this.form.url.trim(), // 移除\n\r 空格等
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
