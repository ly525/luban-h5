
# 脚本/动作系统

## 概念解释
- 类比王者荣耀，如果某个英雄想死而复生，就需要购买[`贤者的庇护-复活甲`](http://www.gamedog.cn/gonglue/20151119/1467955.html)这件装备，从而可以享受这件装备带来的技能：`死亡2秒后原地复活`
- 在鲁班H5中，如果某个按钮想要支持`点击跳转到百度`，就需要购买`外部跳转`这件装备，从而享受这件状态带来的技能：`配置可以跳转网址，点击后跳转至相关网址`
- 即如果你想某个组件拥有某些能力/技能，就需要到装备商店（即脚本商店）给这个组件买一件装备（脚本），然后使用这个装备自带的技能即可

## 如何使用？
1. 项目启动或部署成功后，点击`组件属性`里的`“装备（脚本）商店”`，是没有可选择脚本的，如下图显示为空
![image](https://user-images.githubusercontent.com/12668546/120248804-33d93080-c2ab-11eb-8e4d-439935d48e49.png)
![image](https://user-images.githubusercontent.com/12668546/120248816-39367b00-c2ab-11eb-9226-0cc3c719a033.png)

2. 配置装备商店
- 此时需要到strapi后台进行配置（鲁班对应的管理后台，本地为 localhost:1337/admin）
![image](https://user-images.githubusercontent.com/12668546/120248819-3e93c580-c2ab-11eb-8eb6-af4205050b5a.png)
- 此处配置的业务代码是[前端项目中-src\constants\script.js中的uuid: '1581397464691'部分对应的代码](https://github.com/ly525/luban-h5/blob/master/front-end/h5/src/constants/script.js#L79-L142)，也可自己参照编写其他业务代码
- 
![image](https://user-images.githubusercontent.com/12668546/120248824-45bad380-c2ab-11eb-9225-a6f8c77f61b5.png)

::: details 点击查看
> 即在Content部分填写如下内容
```js
return {
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
    }
```

3. 配置完成
- 配置好后，刷新前端页面，点击`组件“动作面板”`的`“装备（脚本）商店”`就会看到刚刚配置的装备
![image](https://user-images.githubusercontent.com/12668546/120248834-4eaba500-c2ab-11eb-8bcc-35a5c46145a1.png)

- 点击上图里面的`“使用（购买装备）”`即可在动作面板里面看到自己购买的装备，并且可以通过`“使用技能（动作）”` 启用对应的技能
![image](https://user-images.githubusercontent.com/12668546/120248842-55d2b300-c2ab-11eb-8199-85dde503da1b.png)

4. 配置动作
对`动作/技能` 进行简单配置，比如跳转网址，然后点击`预览`，即可看到对应动作/技能的效果了

