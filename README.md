---
order: 0
title: 介绍
---

## 介绍

## 安装

## 开发

### 目录结构

```
│   .eslintrc //eslint配置
│   .gitignore
│   .prettierrc //prettier配置
│   index.js //入口文件
│
├───build-tools //构建脚本，webpack配置文件等
│
├───dist //打包输出的文件夹
|
|───site_dist //打包输出文档站的文件夹
│
├───site //文档页面
│   │   bisheng.config.js //bisheng配置文件
│   │
│   └───theme //文档页面模板
│
├───src //组件源代码
│   │   index.js //入口文件
│   │
│   ├───helloworld //helloworld组件
│   │
│   └───timer //timer组件
│
└───_site //开发环境下文档页面临时文件夹
```

### Dev Server

安装与启动

```bash
$ npm install
$ npm start
```

开发服务器通过`bisheng`调用`webpack-dev-server`启动，bisheng是一个用于将markdown文件转化为基于React的网页应用的工具

`bisheng`配置可以修改配置文件`/site/bisheng.config.js`与`/site/theme/index.js`，具体配置文档参见[https://github.com/benjycui/bisheng](https://github.com/benjycui/bisheng)

` webpack-dev-server`配置可以修改配置文件 `/build-tools/webpack.dev.config.js`

Dev Server将启动文档页面，可以以文档DEMO的形式引入开发中的组件进行调试

### 生成组件目录

当需要添加新组件时，可以通过

```bash
$ npm run gen -- component_name
```

来生成统一的目录结构，并且会初始化相关文件，自动添加导出语句至组件入口`/src/index.js`

> 通过-C参数阻止写入默认文件内容，只生成空白文件，如`npm run gen -- component_name -C`

生成组件的目录结构如下

```
│  index.js //组件入口
│          
├─doc
│  │  readme.md //组件文档
│  │  
│  └─demo
│          basic.md //一个基本用法的DEMO
│          
├─style
│      index.scss //组件样式
│      
└─test
        index.test.js //测试用例
```

> 组件目录结构主要要求文档目录保持规范，`doc/readme.md`为**必须且唯一**的组件文档，`doc/demo/`DEMO文件夹默认只生成了基本示例的DEMO文件，可以根据需求添加更多示例DEMO

> 组件js、css及其它资源文件可以根据需求拆分更多子文件，保证`index.js`入口文件及引用正确即可

### 编写文档

组件的文档都以`markdown`文件形式编写，由`bisheng`将`/site/bisheng.config.js`配置中`source`目录下所有`markdown`文件转化为`JsonML`格式数据传给页面模板，由页面模板根据数据生成文档页面

#### 组件文档

组件文档的路径为组件目录下`doc/readme.md`，一个`Helloworld`组件的文档文件示例如下

```
---
category: Components
title: Helloworld
subtitle: 欢迎组件
cols: 1
---

## 何时使用

欢迎

## API

| 参数 | 说明 | 类型   | 默认值 |
| ---- | ---- | ------ | ------ |
| name | 名称 | string | -      |

```

头部由`---`分隔的区域为YAML格式的文档的meta信息，组件文档文件（`doc/readme.md`）的meta信息包括

- `category` 组件类别，用于导航菜单中的分类，统一使用`Components`

- `title` 组件英文名称，必须

- `subtitle` 组件中文名称

- `col` 传递给文档页面模板的分栏参数，统一使用1

接下来为组件文档，根据需求以markdown格式书写

`## API`下为组件API接口表格，可按格式添加参数说明

#### 组件DEMO

组件DEMO统一放在组件目录`doc/demo/`目录下，该目录下的所有DEMO文件会自动插入组件文档中API接口表格上方位置，一个`Helloworld`组件的基本使用方法DEMO示例如下

````
---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic
---

## zh-CN

输出Hello, world

```jsx
import { Helloworld } from 'react-components-demo'

ReactDOM.render(<Helloworld name='world' />, mountNode)
```

````

DEMO文件的meta信息包括

- `order` 次序，用于DEMO文件夹下所有DEMO的排序

- `title.zh-CN` DEMO中文标题

- `title.en-US` DEMO英文标题

> 标题字段留空可能引起格式转换错误，建议都填写

DEMO文件中通过` ```jsx ... ``` `编写代码示例，代码会自动编译生成组件示例并提供源码展示，可以直接使用库名导入组件

### Tips

- 通过修改`package.json`中的`name`和`version`字段修改打包的包名称与写入的版本信息，同时也可以在DEMO中通过`import { component_name } from packge_name`引入开发中的组件

- webpack中配置了`@`别名指向`/src/`目录，可以方便从公共资源文件夹导入资源等

- 在`jsx`中通过如`img`标签的`src`属性引入本地图片等资源时，打包后图片路径为相对组件库`js`文件的路径，导致无法在业务项目中正常引用，因此所有在`js`文件`import`的图片等文件资源将强制转换为`base64`形式，应避免在`jsx`中引入过大的本地资源，或改为使用`css background-image`等形式引入

### 测试

待完善

### 发布

#### 发布组件库

```bash
$ npm run build
```

> 使用的webpack配置为`/build-tools/webpack.prod.config.js`

#### 发布文档站

```bash
$ npm run site
```

> 使用的webpack配置为`bisheng`提供的默认配置，并做了修改，`bisheng`的默认配置可参见`/node_modules/bisheng/config/getWebpackCommonConfig.js`与`/node_modules/bisheng/config/updateWebpacCommonConfig.js`，并在`/site/bisheng.config.js`中对webpack配置进行修改
