# 后端集成说明

## 需求
- 将鲁班H5 编辑器后端模块 由Node.js  换成 Java(Spring Boot)/PHP 等其它后端语言

## 解决方案
> 目前鲁班H5的后端是基于 Node.js 写的，社区的很多小伙伴反馈，希望能够提供 Spring Boot 或者 PHP 等其它语言驱动的后端API。因为精力有限，我们提供了如下的解决方案，来尝试解决这个需求：
1. 提供[基于 Swagger UI 的后端API 文档](https://h5.luban-h5.com/documentation/)，小伙伴只要参照参照 API 文档，使用 Spring Boot 或者 其它语言实现相同的API即可
![image](https://user-images.githubusercontent.com/12668546/73250033-04b33a80-41f1-11ea-9688-96fe03dccbbe.png)

2. 社区有小伙伴贡献了基于 Spring Boot 的API项目，如下，大家可以根据自己的需求，跟进这两个项目，非常欢迎提 PR 或 相关 issue：
    - [springboot2-jpa-api-for-luban](https://github.com/luban-h5/springboot2-jpa-api-for-luban) ![GitHub stars](https://img.shields.io/github/stars/luban-h5/springboot2-jpa-api-for-luban.svg?style=social&label=Star&maxAge=2592000) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)
    - [springboot2-mybatis-plus-api-for-luban](https://github.com/luban-h5/springboot2-mybatis-plus-api-for-luban) ![GitHub stars](https://img.shields.io/github/stars/luban-h5/springboot2-mybatis-plus-api-for-luban.svg?style=social&label=Star&maxAge=2592000) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

- WIP: Working in Progress 迭代中
- 版权声明：鲁班H5 版权所有，禁止任何形式的转载和抄袭，侵权必

## 贡献代码或自行开发
### 前提准备

1. 了解鲁班H5 编辑器的后端 Model
1. 了解鲁班H5 编辑器的后端 接口

---



## 数据库表/Table(Model/Entity class) + 字段说明

### Work 表：H5 作品

##### 建表语句
```sql
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL COMMENT '标题',
  `description` longtext COMMENT '描述',
  `cover_image_url` longtext,
  `pages` json DEFAULT NULL,
  `publish` tinyint(1) NOT NULL DEFAULT '0',
  `template` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
```

![image](https://user-images.githubusercontent.com/12668546/74095470-744bf280-4b2c-11ea-9acd-92b079329441.png)


##### 字段说明
```json
{
  	// 标题
    "title": {
        "type": "string"
    },
  	// 描述信息
    "description": {
        "type": "text"
    },
  	// 封面图链接
    "cover_image_url": {
        "type": "text"
    },
  	// 页面数据，主要部分
    "pages": {
        "type": "json"
    },
  	// 创建时间
    "created_at": {
        "type": "date"
    },
  	// 更新时间
    "updated_at": {
        "type": "date"
    },
  	// 是否已经发布
    "is_publish": {
        "type": "boolean"
    },
  	// 是否是模板
    "is_template": {
        "type": "boolean"
    },
  	// 关联的表单
    "workforms": {
        "collection": "workform",
        "via": "work"
    }
}
```


### WorkForm：表单收集表

##### 建表语句
```sql
DROP TABLE IF EXISTS `work_forms`;
CREATE TABLE `work_forms` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `form` longtext,
  `work_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `work_id` (`work_id`),
  CONSTRAINT `work_forms_ibfk_1` FOREIGN KEY (`work_id`) REFERENCES `work` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

```javascript
WorkForm Table 结构
{
	formJSON: JSON, // 一条表单记录
  workID: 外键     // 关联的作品ID，外键
}
```



##### 表单提交记录 Example：
```json
[
	{
	  workId: 1,
	  formJSON: {
		  "11": "张三",   // 姓名
		  "22": 18,      // 年龄
		  "33": "工程师"  // 角色
	  }

	},
	{
	  workId: 1,
	  formJSON: {
		  "11": "张四",   // 姓名
		  "22": 18,      // 年龄
		  "33": "工程师"  // 角色
	  }
	},
	{
	  workId: 2,
	  formJSON: {
		  "11": "王五",   // 姓名
		  "22": 18,      // 年龄
		  "33": "工程师"  // 角色
	  }
	},

]
```


```json
{
    "formJSON": {}, // "type": "json",
    "workId" // 关联的 workId，外键
  }
```

####
解释：Work  与 FormCollection 的关系是 一对多的关系，一个作品可以有很多关联的表单统计记录。

---



## 接口实现思路 + 伪代码
> Node.js 代码实现：[https://github.com/ly525/luban-h5/blob/dev/back-end/h5-api/api/work/controllers/Work.js](https://github.com/ly525/luban-h5/blob/dev/back-end/h5-api/api/work/controllers/Work.js)


```json
{
  "routes": [
    {
      // 图片代理，防止跨域
      // 主要是请求一些跨域图片的时候，先走API，API负责请求图片，用来解决跨域问题
      // 代码关键实现：return http.request(request.get.imgURL)
      "method": "GET",
      "path": "/works/cors-proxy",
      "handler": "Work.corsProxy",
      "config": {
        "policies": []
      }
    },
    {
      // 所有作品
      "method": "GET",
      "path": "/works",
      "handler": "Work.find",
      "config": {
        "policies": []
      }
    },
    {
      // 统计作品总数
      "method": "GET",
      "path": "/works/count",
      "handler": "Work.count",
      "config": {
        "policies": []
      }
    },
    {
      // 获取某个作品的详情数据
      // 伪代码：return HTTPJsonResponse(WorkModel.findOne(workId).toJSON())
      "method": "GET",
      "path": "/works/:id",
      "handler": "Work.findOne",
      "config": {
        "policies": []
      }
    },
    {
      // 创建作品
      "method": "POST",
      "path": "/works",
      "handler": "Work.create",
      "config": {
        "policies": []
      }
    },
    {
      // 更新作品
      "method": "PUT",
      "path": "/works/:id",
      "handler": "Work.update",
      "config": {
        "policies": []
      }
    },
    {
      // 删除某个作品
      "method": "DELETE",
      "path": "/works/:id",
      "handler": "Work.delete",
      "config": {
        "policies": []
      }
    },
    {
      // 预览某个作品
      // workJSON = WorkModel.findOne(workId).toJSON()
      // return render('作品模板.jsp', workJSON)
      "method": "GET",
      "path": "/works/preview/:id",
      "handler": "Work.previewOne",
      "config": {
        "policies": []
      }
    },
    {
      //
      /**
      	* 提交某个作品的表单
      	* 思路：
      	比如页面中有
        输入框：姓名，UUID为：11...
        输入框：年龄，UUID为：22...
        单选框：角色，UUID为：33...

        在表单提交的时候，其实提交到后端的数据方式如下：
        1. URL 为 /submit-form/:workId/
				2. payload 是一个 JSON：
        {
        	"11": "张三",   // 姓名
          "22": 18,      // 年龄
          "33": "工程师"  // 角色
        }

        后端在接收到数据之后
        	1. 会向 WorkForm 表中插入一条记录，主要存储在其 form 字段中（JSON 类型字段）
          2. 根据 workId 找到 Work，并绑定到该记录的work字段上（外键）

      */

      // Node.js 参考代码如下：
      // https://github.com/ly525/luban-h5/blob/dev/back-end/h5-api/api/work/controllers/Work.js#L16-L24
      "method": "POST",
      "path": "/works/form/submit/:id",
      "handler": "Work.submitForm",
      "config": {
        "policies": []
      }
    },
    {
      /*
       * 查询某个作品的表单统计数据
     	 * 思路
       		1. 根据 workId 获得 Work
          2. work.pages.find(所有的表单类型元素)
          3. 构造 Object：uuid2NameMap，即 UUID 和元素名称的映射，比如 11 代表姓名，22代表年龄这样
          	举个栗子：
            这是 Work 记录：
            {
              "11": "姓名",
              "22": 年龄,
              "33": "角色"
            }
          4. 我们再从服务器中找出来刚才提交的和这个 Work 绑定的所有表单，其中一条记录栗子如下：
            其中一条表单记录：
            {
              "11": "张三",   // 姓名
              "22": 18,      // 年龄
              "33": "工程师"  // 角色
            }
          5. 这样，我们把两条记录结合下，就会得到如下结果：
          	{
              "姓名": "张三",
              "年龄": 18,
              "角色": "工程师"
            }

          	其中的一条记录，我们就生成完毕了。
          	同样的办法，所有的表单记录都可以生成了，我们把这个返回给前端，前端就可以渲染表单数据了

      			Response Demo：
            ---------------------
            {
              formRecords: [
                {
                  workId: 1,
                  formJSON: {
                    "11": "张三",   // 姓名
                    "22": 18,      // 年龄
                    "33": "工程师"  // 角色
                  }

                },
                {
                  workId: 1,
                  formJSON: {
                    "11": "张三",   // 姓名
                    "22": 18,      // 年龄
                    "33": "工程师"  // 角色
                  }
                },
              ],
              uuidToName: {
                  "11": "姓名",
                  "22": 年龄,
                  "33": "角色"
                }
            }

            ---------------------
      */
      // Node.js 参考代码如下：
      // https://github.com/ly525/luban-h5/blob/dev/back-end/h5-api/api/work/controllers/Work.js#L25-L55
      "method": "GET",
      "path": "/works/form/query/:id",
      "handler": "Work.queryFormsOfOneWork",
      "config": {
        "policies": []
      }
    },
    {
      // 设置某个作品为模板
      // 伪代码：
      // work = WorkModel.findOne(workId).toJSON()
      // newTemplateWork = work.clone()
      // newTemplateWork.isTemplate = true // 不是模版，是正常作品
      // result = WorkModel.create(newTemplateWork)
      // return result

      // Node.js 参考代码如下：
      // https://github.com/ly525/luban-h5/blob/dev/back-end/h5-api/api/work/controllers/Work.js#L56-L63

      "method": "POST",
      "path": "/works/set-as-template/:id",
      "handler": "Work.setAsTemplate",
      "config": {
        "policies": []
      }
    },
    {
      // 基于某个模版创建新作品
      // 伪代码：
      // templateWork = WorkModel.findOne(templateId).toJSON()
      // newWork = templateWork.clone()
      // newWork.title = newTitle || ''
      // newWork.desc = newDesc || ''
      // newWork.isTemplate = false // 不是模版，是正常作品
      // result = WorkModel.create(newWork)
      // return result

      // Node.js 参考代码如下：
      // https://github.com/ly525/luban-h5/blob/dev/back-end/h5-api/api/work/controllers/Work.js#L64-L71

      "method": "POST",
      "path": "/works/use-template/:id",
      "handler": "Work.useTemplate",
      "config": {
        "policies": []
      }
    },
  ]
}

```

