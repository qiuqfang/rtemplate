/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const portfinder = require("portfinder");

const devConfig = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new ReactRefreshWebpackPlugin(), // 解决js的HMR功能运行时全局变量的问题
  ],
  devServer: {
    compress: true, // 开启gzip压缩
    open: false,
    port: 9000,
    hot: true, // 热更新
    proxy: {
      [process.env.PROXY_URL]: {
        target: process.env.TEST_URL, // 后端服务实际地址
        changeOrigin: true,
        pathRewrite: (path) => path.replace(new RegExp(process.env.PROXY_URL), ""),
      },
    },
  },
});

module.exports = new Promise((resolve, reject) => {
  //查找端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
      return;
    }

    //端口被占用时就重新设置evn和devServer的端口
    devConfig.devServer.port = port;

    resolve(devConfig);
  });
});
