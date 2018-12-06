// 自带的库
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:  {
    index: './src/index.js',
    sum: './src/sum.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 必须使用绝对地址，输出文件夹
    // filename: "bundle.js",
    filename: "[name].bundle.js", // 打包后输出文件的文件名
  },
  // devServer: {
  //   contentBase: path.join(__dirname, "dist"), //静态文件根目录
  //   port: 9090, // 端口
  //   host: 'localhost',
  //   overlay: true,
  //   compress: true // 服务器返回浏览器的时候是否启动gzip压缩
  // },
  module: {
    rules: [
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       // 配置 url-loader 的可选项
      //       options: {
      //       // 限制 图片大小 100kB，小于限制会将图片转换为 base64格式
      //         limit: 100000,
      //       // 超出限制，创建的文件格式
      //       // build/images/[图片名].[hash].[图片格式]
      //         name: 'images/[name].[hash].[ext]'
      //      }
      //     }
      //   ]
      // },
      {
          test: /\.css$/,
          use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [require('autoprefixer')] // 添加css中的浏览器前缀
                }
              },
          ]
      }
    ]
  },
  // 插件列表
  plugins: [
    // 输出的文件路径
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    // 单页面配置
    new HtmlWebpackPlugin({
      // 配置输出文件名和路径
      filename: 'index.html',
      // 配置要被编译的html文件
      template: './index.html'
    }),
    // 多页面配置
    // new HtmlWebpackPlugin({
    //   template: './index.html',               // 会与根目录下的index.html相关联，把根目录下index的东西都放到生成的HTML中
    //   filename: 'a.html',         // 生成的HTML名，路径为上面output中的path，不写默认为index.html
    //   title: '测试页面a',
    //   hash: true,
    //   //inject: 'body', //指定链接注入在<head>标签中还是<body>标签中，为false值时表示不自动注入文件中，需要手动设置
    //   chunks: ['index'],  // 多页面分别引入自己的js
    //   minify: {
    //     // collapseWhitespace: true //折叠空白区域 也就是压缩代码
    //   }
    // }),
    // new HtmlWebpackPlugin({
    //   template: './index.html',               // 会与根目录下的index.html相关联，把根目录下index的东西都放到生成的HTML中
    //   filename: 'b.html',         // 生成的HTML名，路径为上面output中的path，不写默认为index.html
    //   title: '测试页面b',
    //   hash: true,
    //   //inject: 'body', //指定链接注入在<head>标签中还是<body>标签中，为false值时表示不自动注入文件中，需要手动设置
    //   chunks: ['sum'],  // 多页面分别引入自己的js
    //   minify: {
    //     // collapseWhitespace: true //折叠空白区域 也就是压缩代码
    //   }
    // })
  ]
}
