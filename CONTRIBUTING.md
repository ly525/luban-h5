# #!zh: 贡献指南

## 原则

- 透明开发: 目前 luban-h5 的所有工作都直接在 [GitHub](https://github.com/ly525/luban-h5) 上进行, 如果你有任何的问题或者建议, 都可以通过 [GitHub issues](https://github.com/ly525/luban-h5/issues) 进行提出和处理, 不提供 QQ 或者微信等直接问题解答(不过可以进行使用讨论);
- 语义版本控制: luban-h5 遵循 [语义版本控制](https://semver.org/lang/zh-CN/), 每个重大更改都记录在 [changelog](./CHANGELOG.md) 文件中;
- 分支策略: 采用主分支模型, 即 `master` 分支作为主分支, 当有新功能时, 创建 `feat/xxx` 分支, 当有 `bug` 时, 创建 `bug/xxx` 分支, 当新功能或者 bug 修改完毕, 需要发起 `pull request` , 如果管理人员审核通过, 则合并到`master`分支, 当收集到足够的 `feat/bug` , 发布版本更新;
- 包管理工具: 推荐使用 `yarn`, 而非 `npm`;
- 注释: 不写注释的程序员不是好码农, 对函数和复杂逻辑要尽量写注释;
- 简单原则: 我们希望在增加新功能时, 尽量避免增加新的 `props`, 现在的 `props` 已经够多了, 对外暴露的接口越简单越好;
- 开发工具: 我们希望开发工具尽量使用 `vscode`, 代码格式化工具使用 `prettier`, 要尽量避免因为格式化工具产生不必要的代码变更, 比如 tab 从 2 个空格转为 4 个空格, 函数前加不加空格等;

## BUG

- 在提 issue 之前, 请确保你去 [搜索](https://github.com/ly525/luban-h5/issues) 过相关问题;
- 提 issue 时, 请确保能有一个可运行的最小 demo 和 错误堆栈, 以提供复现, 最好最好还能有相关的动图演示;
- 如果有相关问题的解决方案那就更完美了, 你可以提交一个 [Pull Request](#Pull-Request) 修复 bug;

## 新功能

新功能也是通过 [issue](https://github.com/ly525/luban-h5/issues) 界面提出的, 如果你想提新功能请遵循以下原则:

- 首先去 issue 界面, 创建一个问题, 并且概述建议, 这样才能更好的讨论和接受;
- 如果能用代码实现自己提的建议就更完美了, 你可以参考 [Pull Request](#Pull-Request) 章节;

## Pull Request

### 完整流程

[动图演示](https://juejin.im/pin/5d9fde09f265da1975255513)

- `fork` 本项目到你的 GitHub;
- `git clone` 你 `fork` 的项目;
- 安装依赖 `./luban-h5.sh init`;
- 从master新建分支并检出新分支 `git checkout -b feat/(your-feature-name)` / `git checkout -b bug/(your-bug-name)`;
- 进行修改，确保负复杂逻辑和函数有相关的 `注释`, 请自测确保没有问题;
- `git push` 你的本地代码到 GitHub;
- 提交 `pull request`;
- 等待管理员处理。
- 管理员操作：
  - [在本地checkout pr](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/checking-out-pull-requests-locally)
  - (可以合并至dev) 进行本地验证
  - review code/merge pr

### 分支说明
1. master: 主分支，即稳定分支
2. dev：验证、测试分支
3. feat/bug: feature/bug-fix分支

### commit 提交规范

目前主流的 Commit message 格式基本上都采用 [Angular](https://github.com/angular/angular) 规范，比较合理和系统化

![image](https://raw.githubusercontent.com/dream2023/images/master/WX20191010-094948.knxlcg0o1tp.png)

#### 格式说明

Commit message 一般包括三部分：`Header`、`Body` 和 `Footer`。`Header` 是必需的，`Body` 和 `Footer` 可以省略。

```
<type>(<scope>): <subject> // header部分
// 空行
<body>
// 空行
<footer>
```

下面详细说明各部分写法规范：

##### Header 部分

只有一行，包括 `type`、`scope` 和 `subject` 三个字段。

```bash
<type>(<scope>): <subject> # 括号为英文括号，冒号后面一定要有一个空格。
```

**【type】（必需）**

用于说明 commit 的类别，常见类别如下：

- feat：新增功能
- fix：修复 bug
- docs：修订文档，如 Readme, Change Log, Contribute 等
- refactor：代码重构，未新增任何功能和修复任何 bug
- style： 仅调整空格、格式缩进等（不改变代码逻辑的变动）
- test：测试用例的增加/修改
- chore：非 src 和 test 的修改
- merge：合并分支或冲突等
- revert： 回滚到上一个版本
- build：改变构建流程，新增依赖库、工具等（例如 webpack 修改）
- ci：自动化流程配置修改

**【scope】（可选）**
用于说明 commit 的影响范围，可以是页面名，组件名等，可以省略。

**【subject】（可选）**
本次提交的简要描述，不超过 50 个字符，且结尾不加任何句号（.）。

##### Body 部分

对本次 commit 更详细的描述，可以分成多行，建议 72 个字符以内。需要描述的信息包括:

- 为什么要提交这个变更，要解决什么问题
- 简要描述如何解决这个问题
- 是否存在副作用、风险？

##### Footer 部分

- 破坏性变更：需要描述相关信息
- 关闭指定 Issue 或 bug：输入 Issue 或 bug 信息
- 其他：可以添加一个链接到 issue 或 bug 的地址或者其它文档

以上便是 commit 规范, 如果觉得上述描述过于复杂, 则将 `git commit` 替换成 `yarn commit`即可有交互式命令行提示。
