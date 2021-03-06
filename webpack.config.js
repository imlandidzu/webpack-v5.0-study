const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

require('dotenv').config();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
module.exports = () => ({
  //  mode 当前的运行模式：开发环境/生产环境/不指定环境
  mode: 'development',
  devtool: "hidden-source-map",
  entry: {
    main: './src/index.js',
    vendor: ['lodash'],
  },
  output: {
    path: resolve(__dirname, "dist"), // 输出文件夹的绝对路径
    filename: "[name].[chunkhash:8].js", // 输出的文件名
    chunkFilename: "[name].[chunkhash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.(jpg|png|bmp|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              esModule: false,
              limit: 5 * 1024,
            },
          },
        ],
      },
      { test: /\.html$/, use: "html-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
  ],
});
