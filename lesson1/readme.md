# 第一个demo

### 小试锋芒
说了这么多，我们第一件要做的事情就是写代码啦。

* 在上节课的 project 目录下新增 sum.js
![image_1cofdh40gdrp8k41uvq1san292l.png-9.7kB](http://static.zybuluo.com/only-twj520Q/55brzbu5v61g59wvzz0llvlw/image_1cofdh40gdrp8k41uvq1san292l.png)

* 写入以下代码
```
// sum.js
// 这个模块化写法是 node 环境独有的，浏览器原生不支持使用
module.exports = function(a, b) {
    return a + b
}

// index.js
var sum = require('./sum')
console.log(sum(1, 2))

//index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
    <script src="./dist/bundle.js"></script>
</body>
</html>

```
* 在命令行中，cd到项目根目录下执行```npm start```，执行结果如下图。

    * 第一个红框：执行的实际命令
    * 第二个红框：本地打包的hash值
    * 第三个红框：打包的文件

![image_1cofet987vci4h533i12fq1a6n9.png-300.9kB](http://static.zybuluo.com/only-twj520Q/yvs40a213agjfokz0vcybjwq/image_1cofet987vci4h533i12fq1a6n9.png)

通过上图，可以发现原本两个 JS 文件一共只有 100B，但是打包后却增长到有了4kb，这之中 webpack 肯定做了什么事情，我们去 bundle.js 文件中看看。

* 把代码简化以后，核心思路是这样的
```
var array = [(function () {
        var sum = array[1]
        console.log(sum(1, 2))
    }),
    (function (a,b) {
        return a + b
    })
]
array[0]() // -> 3
```

* 接下去，我们在浏览器中打开 index.html，如果一切访问都正常，打开控制台可以看到输出3。

**传送门**：[loader](https://github.com/only-twj520Q/webpack-lessons/tree/master/lesson2)

>博客都会先发布在github上。
如果有错误或者不严谨的地方，请务必给予指正，十分感谢。
如果喜欢或者有所帮助，欢迎**star**，[github](https://github.com/only-twj520Q/webpack-lessons)。新手需要鼓励，希望大家不要吝啬自己的赞哦，赠人玫瑰，手有余香。
