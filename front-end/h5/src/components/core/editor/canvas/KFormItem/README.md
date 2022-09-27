KFormItem
====
构建表单控件
根据参数不同的type，生成对应的控件


### 使用方式

```
# 参数record：
{
    type: "input", // 表单类型
    name: "输入框", // 标题文字
    options: {
      type: "text", // input的type类型
      width: "100%", // 宽度
      defaultValue: "", // 默认值
      placeholder: "请输入", // 占位内容
      disabled: false // 是否禁用
    },
    model: "", // 数据字段
    key: "",
    rules: [  //验证规则
      {
        required: false, // 是否必填
        message: "必填项"
      }
    ]
  }
	
```




