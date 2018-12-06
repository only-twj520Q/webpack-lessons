// 自带的库
const path = require('path');

module.exports = {
  entry:  './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 必须使用绝对地址，输出文件夹
    filename: "bundle.js", // 打包后输出文件的文件名
    publicPath: 'dist/'
  },
  module: {
    rules: [
      // {
      //   // 图片格式正则
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   use: [
      //     {
      //       // loader类型
      //       loader:'file-loader',
      //       options: {
      //         outputPath: 'images/'
      //       }
      //     }
      //   ]
      // },
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
      },
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
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
        // 限制范围，提高打包速度
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  }
}
