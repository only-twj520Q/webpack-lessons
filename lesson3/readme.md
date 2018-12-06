# plugin

## 插件
插件（Plugins）是用来拓展 Webpack 功能的，它们会在整个构建过程中生效，执行相关的任务。插件是 webpack 的支柱功能

## 区别
Loaders 和 Plugins 常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders 是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。
Webpack 有很多内置插件，同时也有很多第三方插件，可以让我们完成更加丰富的功能。

## 用法
使用插件的方法
要使用某个插件，我们先需要通过 npm 安装它，然后要做的就是在 webpack 配置中的 plugins 关键字部分添加该插件的一个实例（plugins是一个数组）。
由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例。
根据你的 webpack 用法，这里有多种方式使用插件。

## 使用教程
### 一、mini-css-extract-plugin
上一篇说到将 CSS 代码整合到 JS 文件会导致 JS 的文件变大，
所以接下来我们将使用插件将 CSS 文件打包为一个单独文件。

#### 废弃的extract-text-webpack-plugin插件
此插件将 CSS 提取到单独的文件中。它为每个包含CSS的 JS 文件创建一个 CSS 文件。它支持 CSS 和 SourceMaps 的按需加载。
在 webpack4 发布之前一直使用的是 extract-text-webpack-plugin 插件来分离提取单独打包 css 代码，但是在 webpack4 发布以后这个不再支持。

#### 新的插件
后面查了一下，webpack4得使用 mini-css-extract-plugin 这个插件来单独打包css。此插件将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。它同样支持 CSS 和 SourceMaps 的按需加载。

#### 操作步骤如下

* 先安装依赖
```npm install -D mini-css-extract-plugin```
* 然后修改 webpack.config.js 代码
```
module.exports = {
    // ...
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
}
```
* 执行```npm start```，命令行结果如下，我们可以看到css被单独
![image_1cok75031tg45rs7u0anm1gjg19.png-68.5kB](http://static.zybuluo.com/only-twj520Q/xg2qa7r3xjh8j5eerj1hb0lo/image_1cok75031tg45rs7u0anm1gjg19.png)

* 打开浏览器
刷新页面会发现黑框消失了，那是因为我们的 HTML 文件没有引用新的 CSS 文件，所以这里需要我们手动引入下。

### 二、html-webpack-plugin
#### 作用
上面我们会发现每次都手动引入各种编译打包后的文件，那随着后面代码量增大的时候，这将是个复杂的工程。而且在生产环境的时候，我们的静态资源文件通常也会带上版本号之类的，我们无法在 index.html 中写死它。
所以我们需要 html-webpack-plugin 这个插件。
这个插件的作用是依据一个简单的 index.html 模板，生成一个自动引用你打包后的 JS 文件的新 index.html。这在每次生成的 js 文件名称不同时非常有用（比如添加了hash值）。

#### 操作步骤如下
* 先安装依赖
```
npm install -D html-webpack-plugin
```
* 然后修改代码如下
```
// webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ]
};
// index.html
去掉 script 标签引用的固定的 js 文件，插件会自动引入生成的 js
```
* 执行```npm start```，命令行结果如下
![1538989964918.jpg-115.8kB](http://static.zybuluo.com/only-twj520Q/2frcouxzgsguqg71dimj7lv0/1538989964918.jpg)

* 打开dist目录下的 index.html ，在浏览器中可以看到![32.jpg-60.3kB](http://static.zybuluo.com/only-twj520Q/lb4jko0ducrxjxg5ismfhdfi/32.jpg)
![2131.jpg-52.6kB](http://static.zybuluo.com/only-twj520Q/l2g4h10dnpvqkq19scvas0gt/2131.jpg)

#### 多页面
当我们需要生成多个页面时，需要写多个 new HtmlWebpackPlugin，详细的 webpack 配置参见代码，如下图。
![image_1cu1es7tneqk105nq7k1t201lmc9.png-298.5kB](http://static.zybuluo.com/only-twj520Q/txhzw106ew7gitcmpk06wnmm/image_1cu1es7tneqk105nq7k1t201lmc9.png)

### 三、autoprefixer
我们在写 css 时不免要考虑到浏览器兼容问题，如 transform 属性，需要添加浏览器前缀以适配其他浏览器。故使用到 postcss-loader 这个 loader。

#### 操作步骤如下
* 先安装依赖
```npm install -D postcss-loader autoprefixer ```
* 然后修改 webpack.config.js 代码
```
module.exports = {
    // ...
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                {
                    loader: 'postcss-loader',
                    options: {
                    // 添加css中的浏览器前缀
                        plugins: [require('autoprefixer')]
                }
              },
          ]
      }
        ]
    }
}
```
* 执行```npm start```

* 打开浏览器
我们发现打包出的css会自动根据浏览器加上前缀，比如这个 -webkit-transform
![1539168119081.jpg-182.6kB](http://static.zybuluo.com/only-twj520Q/y3l47z7kfntwu05nl2zpx61n/1539168119081.jpg)

### 四、webpack-dev-server
上面讲到了都是如何打包文件，但是开发中我们需要一个本地服务，这时我们可以使用 webpack-dev-server 在本地开启一个简单的静态服务来进行开发。
webpack-dev-server 是 webpack 官方提供的一个工具，可以基于当前的 webpack 构建配置快速启动一个静态服务。它让项目运行在服务器而不是本地。

#### 配置开发服务器

* 先安装依赖
```
npm install -D webpack-dev-server
```
* 然后修改代码如下
```
// webpack.config.js
module.exports = {
    // ...
    devServer: {
        //静态文件根目录
        contentBase: path.join(__dirname, "dist"),
        port: 9090, // 端口
        host: 'localhost',
        overlay: true,
        //服务器返回浏览器的时候是否启动gzip压缩
        compress: true
    }
}
// package.json
"scripts": {
    // ...
    "server": "webpack-dev-server --open --mode=development"
  },
```
* 执行```npm run server```
* webpack会在浏览器中打开一个页面，页面地址是 ```http://localhost:9090/```

#### 未完待续
下面的章节将会和大家探讨一下更多插件的用法，期待大家的关注和指导。

>博客都会先发布在github上。
如果有错误或者不严谨的地方，请务必给予指正，十分感谢。
如果喜欢或者有所帮助，欢迎**star**，[github](https://github.com/only-twj520Q/webpack-lessons)。新手需要鼓励，希望大家不要吝啬自己的赞哦，赠人玫瑰，手有余香。
