# webpack入门教程

## 什么是webpack
webPack可以看做是**模块打包机**：它做的事情是，分析你的项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。webpack 的最终目的是将我们开发的具有高可读性和可维护性的代码文件打包成浏览器可以识别并正常运行的压缩代码。

## 为什么要使用webpack
自从出现模块化以后，大家可以将原本一坨代码分离到个个模块中，但是由此引发了一个问题。每个 JS 文件都需要从服务器去拿，由此会导致加载速度变慢。webpack 最主要的目的就是为了解决这个问题，将所有小文件打包成一个或多个大文件，官网的图片很好的诠释了这个事情，除此之外，webpack 也是一个能让你使用各种前端新技术的工具。
![v2-add7632a666f32dc12a98e30fe17afc2_hd.jpg-16.1kB](http://static.zybuluo.com/only-twj520Q/5o287y068psqdhew66nr4agd/v2-add7632a666f32dc12a98e30fe17afc2_hd.jpg)

## webpack 工作方式
webpack 的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），webpack 将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个（或多个）浏览器可识别的JavaScript文件。
webpack 的打包流程如下

* 根据传入的参数模式(development | production)来加载对应的默认配置
* 在 entry 里配置的 module 开始递归解析 entry 所依赖的所有 module
* 每一个 module 都会根据 rules 的配置项去寻找用到的 loader，接受所配置的 loader 的处理
* 以 entry 中的配置对象为分组，每一个配置入口和其对应的依赖文件最后组成一个代码块文件 (chunk) 并输出
* 整个流程中 webpack 会在恰当的时机执行 plugin 的逻辑，来完成自定义的插件逻辑

## webpack核心概念
- 入口 entry：工程的入口文件。
它用来告诉 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
一个简单的例子
```
module.exports = {
  entry: './src/file.js'
};
```
- 输出output：工程编译打包后的文件。
它用来告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist
在下面的示例中，我们通过 output.filename 和 output.path 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪里。
```
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```
- loader：文件转换器。
webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。通过使用不同的 loader，webpack 有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。
- plugin：插件。
用于扩展 webpack 的功能。loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。

## webpack.config.js实例
```
module.exports = {
    // 打包入口：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
    entry: '',
    // 出口
    output: '',
    // 配置解析：配置别名、extensions 自动解析确定的扩展等等
    resolve: {},
    // 开发服务器：run dev/start 的配置，如端口、proxy等
    devServer: {},
    // 模块配置：配置loader（处理非 JavaScript 文件，比如 less、sass、jsx、图片等等）等
    module: {},
    // 插件的配置：打包优化、资源管理和注入环境变量
    plugins: []
}
```

## 搭建目录
咱们废话不多说，开始我们今天的课程吧
#### 新建初始目录
```
mkdir project  //新建project目录，这是咱们的demo的初始目录
cd project
npm init // 会新建一个package.json文件，用来管理和保存项目的基本信息及依赖
```
最终新建的目录如下图，src存放源码，dist为编译打包后的最终目录
![1538106156381.jpg-19.5kB](http://static.zybuluo.com/only-twj520Q/br36co26c55uh2gg4dvg9zle/1538106156381.jpg)
#### 安装依赖
```
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```
如果你使用 webpack 4+ 版本，你还需要安装 CLI。
```
npm install --save-dev webpack-cli
```
对于大多数项目，我们建议本地安装。这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。通常，webpack 通过运行一个或多个 npm scripts，会在本地 node_modules 目录中查找安装的 webpack：
在 package.json 文件中可以写入下面的代码，作为项目的启动命令。其中 --config 的目的是为 webpack 指定配置文件。如果不使用 --config 来指定，则webpack.config.js 是默认的配置文件
```
// package.json
"scripts": {
    "start": "webpack --config webpack.config.js --mode=development"
}
```
我们在命令行中执行代码```npm start```，即相当于执行```webpack --config webpack.config.js --mode=development```。
对于 npm 使用还不太熟悉的同学可以看下
[npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)

**注意**：这边需要加上```--mode=--mode=development```，表示当前的环境是开发环境，不然就会默认为生产环境，出现下面黄色警告，生成的bundle文件也是被压缩过的。
![image_1cofeh4j714927vm9t2n371q989.png-178.6kB](http://static.zybuluo.com/only-twj520Q/xuvaoexqashynfy2r7vpwggq/image_1cofeh4j714927vm9t2n371q989.png)
>注：mode 配置是 webpack4 新加入的，它是代表项目的运行环境。通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化。

**development** 模式

* 浏览器调试工具
* 注释、开发阶段的详细错误日志和提示
* 快速和优化的增量构建机制
* 提供 uglifyjs-webpack-plugin 代码压缩

**production** 模式

* 开启所有的优化代码
* 更小的bundle大小
* 去除掉只在开发阶段运行的代码
* Scope hoisting和Tree-shaking

这一节只搭建了基本的目录，下节开始具体的教程。

**传送门**：[第一个demo](https://github.com/only-twj520Q/webpack-lessons/tree/master/lesson1)

>博客都会先发布在github上。
如果有错误或者不严谨的地方，请务必给予指正，十分感谢。
如果喜欢或者有所帮助，欢迎**star**，[github](https://github.com/only-twj520Q/webpack-lessons)。新手需要鼓励，希望大家不要吝啬自己的赞哦，赠人玫瑰，手有余香。
