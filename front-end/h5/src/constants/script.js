/*
 * @Author: ly525
 * @Date: 2020-02-11 11:35:41
 * @LastEditors: ly525
 * @LastEditTime: 2020-05-10 16:33:29
 * @FilePath: /luban-h5/front-end/h5/src/constants/script.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2019 luban-h5. All Rights Reserved
 */
export default [
  {
    uuid: '1588851801426',
    label: '选择元素',
    value: `return {
      methodsConfig: {              // 此项配置自定义方法的在组件配置面板如何展示
        clickFn: {             // 方法名，对应于 methods 内的某方法
          label: '选择元素',        // 自定义方法显示名
          params: [                 // 参数列表，对象数组
            {
              label: '选择元素',
              desc: '请选择页面中的其它元素',
              type: 'object',
              default: '',
            editor: {
                type: 'a-select',
                label: '元素',
                prop: {
                  options: [
                    {
                      "label": "弹窗1",
                      "value": "dialog1"
                    },
                    {
                      "label": "弹窗2",
                      "value": "dialog2"
                    },
                  ]
                }
              }
            },
            {
              label: '动作',     // 参数1的名称
              desc: '做某某事',   // 参数1的描述
              type: 'string',       // 参数1的类型，支持string|number|boolean|array|object
              default: 'show',          // 参数1默认值
              editor: {
                type: 'a-select',
                label: '类型',
                prop: {
                  options: [
                    {
                      "label": "显示",
                      "value": "show"
                    },
                    {
                      "label": "隐藏",
                      "value": "hide"
                    },
                  ]
                }
              }
            },
          ]
        }
      },
      methods:{
        clickFn:function(type, url){
          console.log(url)
          let win = window.open(type+url, '_blank')
          win.focus()
        }
      }
    }`
  },
  {
    uuid: '1581397464691',
    label: '外部跳转1',
    value: `return {
      methodsConfig: {              // 此项配置自定义方法的在组件配置面板如何展示
        clickFn: {             // 方法名，对应于 methods 内的某方法
          label: '外部跳转1',        // 自定义方法显示名
          params: [                 // 参数列表，对象数组
            {
              label: '类型',
              desc: 'query形式参数',
              type: 'object',
              default: 'http://',
              editor: {
                type: 'a-select',
                label: '类型',
                prop: {
                  options: [
                    {
                      "label": "http://",
                      "value": "http://"
                    },
                    {
                      "label": "https://",
                      "value": "https://"
                    },
                    {
                      "label": "邮件",
                      "value": "mailto:"
                    },
                    {
                      "label": "打电话",
                      "value": "tel:"
                    },
                    {
                      "label": "页码跳转",
                      "value": "#page"
                    },
                    {
                      "label": "表单提交",
                      "value": "@submit"
                    },
                    {
                      "label": "分享",
                      "value": "@share"
                    }
                  ]
                }
              }
            },
            {
              label: '跳转地址',     // 参数1的名称
              desc: '项目相对地址',   // 参数1的描述
              type: 'string',       // 参数1的类型，支持string|number|boolean|array|object
              default: 'www.baidu.com',          // 参数1默认值
            },
          ]
        }
      },
      methods:{
        clickFn:function(type, url){
          console.log(url)
          let win = window.open(type+url, '_blank')
          win.focus()
        }
      }
    }`
  },
  {
    uuid: '1581397464694',
    label: '跳转动作2',
    value: `return {
      methodsConfig: {              // 此项配置自定义方法的在组件配置面板如何展示
        clickFn2: {             // 方法名，对应于 methods 内的某方法
          label: '跳转动作2',        // 自定义方法显示名
          params: [                 // 参数列表，对象数组
            {
              label: '跳转地址',     // 参数1的名称
              desc: '项目相对地址',   // 参数1的描述
              type: 'string',       // 参数1的类型，支持string|number|boolean|array|object
              default: ''           // 参数1默认值
            },
          ]
        }
      },
      methods:{
        clickFn2:function(url){
          console.log(url)
          let win = window.open(url, '_blank')
          win.focus()
        }
      }
    }`
  },
  {
    uuid: '1581397464695',
    label: '加载数据-1',
    value: `return {
      created() {
        // const req = new XMLHttpRequest();
        // req.onreadystatechange = () => {
        //   if (req.readyState === 200) {
        //     window.dataCenter = {};
        //   }
        // };
        // req.setHeader()
        // req.open('GET', url, true)
        // req.send(null);
        this.$lubanUtils.request.get('/works/7').then(res => {
          window.dataCenter = res.data;
        });
      }
    }`
  }
]
