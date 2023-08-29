/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // 压缩图片
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); // 优化压缩css文件
const lightningcss = require("lightningcss");
const browserslist = require("browserslist");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css文件提取出来

const CompressionWebpackPlugin = require("compression-webpack-plugin"); // gzip压缩
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 复制文件

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "js/[name].js",
    // webpack5.20+ 功能:CleanWebpackPlugin
    clean: true,
  },
  optimization: {
    minimize: true, // 是否执行 minimizer 选项
    minimizer: [
      new CssMinimizerWebpackPlugin({
        minify: CssMinimizerWebpackPlugin.lightningCssMinify,
        minimizerOptions: {
          targets: lightningcss.browserslistToTargets(
            browserslist(undefined, {
              path: path.resolve(process.cwd(), ".browserslistrc"),
            })
          ),
        },
      }),
      // 无损压缩
      new ImageMinimizerPlugin({
        minimizer: [
          {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                jpeg: {
                  quality: 80,
                },
                jpg: {
                  quality: 80,
                },
                png: {
                  quality: 80,
                },
                webp: {
                  quality: 80,
                },
              },
            },
          },
        ],
      }),
    ],
    splitChunks: {
      cacheGroups: {
        layouts: {
          name: "layouts",
          test: path.resolve(__dirname, "../src/layouts/"),
          chunks: "all",
          enforce: true,
        },
        common: {
          name: "common-styles",
          test: /[\\/]src[\\/]styles[\\/](antd|reset)(.*)/,
          chunks: "all",
          enforce: true,
        },
        normalize: {
          name: "normalize",
          test: /[\\/]node_modules[\\/]normalize(.*)/,
          chunks: "all",
          enforce: true,
        },
        // 将react相关的库单独打包，减少node_modules的chunk体积。
        react: {
          name: "react",
          test: /[\\/]node_modules[\\/]react(.*)/,
          chunks: "all",
        },
        // 如果项目中使用antd，此时将所有node_modules打包在一起，那么打包输出文件会比较大。
        // 所以我们将node_modules中比较大的模块单独打包，从而并行加载速度更好
        // 如果项目中没有，请删除
        antd: {
          name: "antd",
          test: /[\\/]node_modules[\\/]antd(.*)/,
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single", // 值single将创建一个运行时文件，用于共享所有生成的块。值multiple向每个入口点创建一个运行时文件
  },
  plugins: [
    // 将public下面的资源复制到dist目录去（除了index.html）
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(process.cwd(), "public"),
          to: path.resolve(process.cwd(), "dist"),
          toType: "dir",
          noErrorOnMissing: true, // 不生成错误
          globOptions: {
            // 忽略文件
            ignore: ["**/index.html"],
          },
          info: {
            // 跳过terser压缩js
            minimized: true,
          },
        },
      ],
    }),
    /* 开启gzip压缩 */
    new CompressionWebpackPlugin({
      test: /\.js$|\.html$|\.css/,
      include: undefined,
      exclude: undefined,
      algorithm: "gzip",
      compressionOptions: { level: 9 },
      threshold: 0,
      minRatio: 0.8,
      filename: "[path][base].gz",
      deleteOriginalAssets: false, // 项目上线时改为true，为了开启打包文件分析工具必须改为false
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
});
