# loader

## loader登场
Loader是webpack提供的最激动人心的功能之一了。通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。

### 作用
loader的作用：

* 实现对不同格式的文件的处理，比如说将scss转换为css，或者 typescript转化为js
* 转换这些文件，从而使其能够被添加到依赖图中 loader 是 webpack 最重要的部分之一，通过使用不同的Loader，我们能够调用外部的脚本或者工具，实现对不同格式文件的处理，loader需要在webpack.config.js里边单独用module进行配置，配置如下：

### 使用
Loaders需要单独安装并且需要在 webpack.config.js 中的 modules 关键字下进行配置，Loaders的配置包括以下几方面：

* test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
* use：表示进行转换时，应该使用哪个 loader
* loader：loader的名称（必须）
* include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
* query：为loaders提供额外的设置选项（可选）
不过在配置loader之前，我们把Greeter.js里的问候消息放在一个单独的JSON文件里,并通过合适的配置使Greeter.js可以读取该JSON文件的值，各文件修改后的代码如下：

```
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: 'xxx-loader'
            }
        ]
    }
}
```

这里介绍几个常用的loader：babel-loader： 让下一代的js文件转换成现代浏览器能够支持的JS文件。babel有些复杂，所以大多数都会新建一个.babelrc进行配置css-loader,style-loader:两个建议配合使用，用来解析css文件，能够解释@import,url()如果需要解析less就在后面加一个less-loaderfile-loader: 生成的文件名就是文件内容的MD5哈希值并会保留所引用资源的原始扩展名url-loader: 功能类似 file-loader,但是文件大小低于指定的限制时，可以返回一个DataURL事实上，在使用less,scss,stylus这些的时候，npm会提示你差什么插件，差什么，你就安上就行了

## 处理图片
这一小节我们将使用 url-loader 和 file-loader，
首先是 file-loader，这两个库不仅可以处理图片，还有其他的功能，有兴趣的可以自行学习。

### file-loader
file-loader 是解决 css 或 js 等文件中引入图片路径的问题。
它用于处理很多类型的文件，它的主要作用是直接输出文件，把构建后的文件路径返回。
#### 使用教程
* 安装依赖
```
npm -D url-loader file-loader
```
> **注解**：
-D是--save-dev的缩写
-S是--save的缩写
区别：-D是只在开发环境即dev中使用，项目发布以后就不会使用到，如babel，loader等
-S是在开发和正式环境都会用到，如jq，Vue等

在上一节的目录上新增images目录，里面新增两张图片
![image_1cog2184d1gkgun1121k9kkc8hm.png-13.3kB](http://static.zybuluo.com/only-twj520Q/3mfi1ibzbg3a6nsm5tab3209/image_1cog2184d1gkgun1121k9kkc8hm.png)

* 修改代码如下
```
// index.js文件
let smallImg = document.createElement('img');
// 必须 require 进来
let image_path = require('./images/small.jpg');
smallImg.src = image_path;
// 输入图片路径
console.log('path',image_path);
// 嵌入html中
document.body.appendChild(smallImg)

// webpack.config.js文件
module.exports = {
    // ...
    module: {
        rules: [
          {
            // 图片格式正则
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
              {
                // loader类型
                loader:'file-loader',
                options: {
                  outputPath: 'images/'  
                }
              }
            ]
          }
        ]
    }
}
```
* 执行```npm start```，打包的信息如下
![image_1cog1ul26191g1qag14vo1qpd1ijo9.png-168.4kB](http://static.zybuluo.com/only-twj520Q/mex2vh4jhswo5t5qh4zw6uvi/image_1cog1ul26191g1qag14vo1qpd1ijo9.png)
可以看到。默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。图片正确的被识别loader识别了。

* 在浏览器中打开 HTML 文件，发现小图确实显示出来了，但是却没有看到大图，打开开发者工具栏，可以发现我们大图的图片路径是有问题的，所以我们又要修改 webpack.config.js 代码了。
打开控制台可以看到
![image_1cog2lm8312cctsi1e801pairkf13.png-87.7kB](http://static.zybuluo.com/only-twj520Q/cg8zggqkjmcytsz0qgfip33y/image_1cog2lm8312cctsi1e801pairkf13.png)
当你 ```let image_path = require('./images/small.jpg');```，该图像将被 file-loader 处理并添加到 dist 目录下，并且该变量image_path 将被转化成包含该图像在处理后的最终 url，在该例子中就是 images/xxx.jpg。所以目前的图片引用路径为 images/xxx.jpg
但是我们的 index.html 文件是在项目根目录下，明显，如果要正确引用到图片，还要再加一层 dist 目录。所以，修改配置文件如下：
```
module.exports = {
    // ...
    output: {
        path: path.resolve(__dirname, 'dist'), // 必须使用绝对地址，输出文件夹
        filename: "bundle.js", // 打包后输出文件的文件名
        publicPath: 'dist/'
  }
}
```
最后运行下 ```npm run start```，编译成功了，再次刷新下页面，可以发现这次大图被正确的显示了。

> 注：publicPath就是一个公共地址，用于处理静态资源的引用地址问题，比如图片的地址路径问题。尤其是在你打包图片生成的路径与html的不在同一个目录时，这个时候就必须用publicPath来指定图频引用径。

### url-loader
#### 介绍
url-loader 不是帮我们输出图片加载路径，而是把图片编码成了另外一种形式，直接写进页面里。可是当图片很大时，这个字符串就会变得非常庞大，它会让加载文件也变得很大，所以当图片文件过大时，我们要让它打包，让它去请求，如果图片很小，直接使用 url-loader 采用编码格式为base64的方式将图片写进页面里。
#### 区别
url-loader和file-loader是什么关系呢？简答地说，url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。
#### 使用教程
* 安装依赖
```npm i -D url-loader```
* 修改代码如下
```
module.exports = {
    // ...
    module: {
        // ...
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
              {
                loader: 'url-loader',
                // 配置 url-loader 的可选项
                options: {
                // 限制 图片大小 100kB，小于限制会将图片转换为 base64格式
                  limit: 100000,
                // 超出限制，创建的文件格式
                // build/images/[图片名].[hash].[图片格式]
                  name: 'images/[name].[hash].[ext]'
               }
              }
            ]
        }
    }
}
```
执行```npm start```，在命令行工具中，可以发现大的图片被单独提取了出来，小的图片打包进了 bundle.js 中。
![image_1cog45ets1rbf1hp17fe9odnei9.png-87.7kB](http://static.zybuluo.com/only-twj520Q/rr3ijcy1pddiklw29eudkroz/image_1cog45ets1rbf1hp17fe9odnei9.png)

* 在浏览器中打开 HTML
打开控制台，可以看到小图的 src 被转化成 base64 编码
![image_1cog489837a51ul414k4160p17rr16.png-54.5kB](http://static.zybuluo.com/only-twj520Q/0ddssqco3edgp23oudp8yyyu/image_1cog489837a51ul414k4160p17rr16.png)

#### 小结
通过上面的介绍，我们可以看到，url-loader 工作分两种情况：
1. 文件大小小于limit参数，url-loader将会把文件转为DataURL；
2. 文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。

## 处理样式
我们希望使用 webpack 来进行构建 css 文件，为此，需要在配置中引入 loader 来解析和处理 CSS 文件：
### css-loader style-loader
css-loader 用来解析处理 CSS 文件中的 url 路径,要把 CSS 文件变成一个模块,style-loader 可以把 css 文件 head 中。执行顺序从右向左依次执行，先走 css-loader，再走 style-loader.
前两种 使用 file-loader（ 解决CSS等文件中的引入图片路径问题） url-loader（当图片较小的时候会把图片BASE64编码，大于配置的limit参数的时候还是使用file-loader 进行拷贝）
#### 使用教程
* 安装依赖
```npm i -D css-loader style-loader```
* 代码修改如下
```
// index.js文件
import './styles/index.css'

// index.css文件
div {
    width: 100px;
    height: 100px;
    border: 1px solid black;
}

// webpack.config.js
module.exports = {
    // ...
    module: {
       {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ],
            // 限制范围，提高打包速度
            include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
        }
    }
}
```
* 执行```npm start```
* 打开浏览器
如下图，发现浏览器中可以正常显示了，而且在head里加入了style标签，加入了样式。
![1539078673170.jpg-67.5kB](http://static.zybuluo.com/only-twj520Q/gtkx8w6x0rwj0u59swzd25il/1539078673170.jpg)但是我们发现，如下图，这个页面只引入了一个bundle.js，说明 webpack 是把 css 文件打包进了 bundle.js。
![1539078699785.jpg-62.2kB](http://static.zybuluo.com/only-twj520Q/rxvo6te4f0egbekavkbsuk8i/1539078699785.jpg)

#### 不足
但是将 CSS 代码整合进 JS 文件也是有弊端的，大量的 CSS 代码会造成 JS 文件的大小变大，操作 DOM 也会造成性能上的问题，所以接下来我们将使用 extract-text-webpack-plugin插件将 CSS 文件打包为一个单独文件。

#### css-module
CSS modules的技术意在把JS的模块化思想带入CSS中来，通过CSS模块，所有的类名，动画名默认都只作用于当前模块。Webpack对CSS模块化提供了非常好的支持，只需要在CSS loader中进行简单配置即可，然后就可以直接把CSS的类名传递到组件的代码中，这样做有效避免了全局污染。

* 代码修改如下
```
// webpack.config.js
module.exports = {
    // ...
    module: {
       {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 指定开启css module
              modules: true,
              // 指定css的类名格式
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        ],
        // 限制范围，提高打包速度
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    }
}
```
* 执行```npm start```
* 打开浏览器，如下图
css的名字被替换成了配置文件中的格式，并且具有唯一性，避免了不同作用域下类名导致的冲突。这样做目前有个问题，由于类名的更改，html 文件中的类名没有做处理，这样就会导致 css 失效，下一节我们将通过插件解决这个问题。
![1539079123293.jpg-48.3kB](http://static.zybuluo.com/only-twj520Q/dj7xfzpbopm9vlhu3l6vcanr/1539079123293.jpg)

### less-loader
* 安装依赖
```npm install less less-loader```
* 代码修改如下
```
// styles文件夹下新增index.less文件
@width: 100px;
@height: 100px;
#app {
  width: @width;
  height: @height;
  border: 1px solid black;
}

// index.js
import './styles/index.less'

// webpack.config.js
module.exports = {
    {
        test: /\.less$/,
        // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
        // 限制范围，提高打包速度
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
    }
}
```
具体结果这边就不截图了，反正是OK的。
