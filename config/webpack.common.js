/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const os = require("os");

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 配置html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css文件提取出来
const ESLintWebpackPlugin = require("eslint-webpack-plugin"); // 用于报告不符合规范的代码
const { DefinePlugin } = require("webpack");

const { WebpackPluginPages } = require("@qiuqfang/webpack-plugin-pages")

const dotenv = require("dotenv");

const commonEnv = dotenv.config({
  path: path.resolve(process.cwd(), `config/.env`),
}).parsed;

const modeEnv = dotenv.config({
  path: path.resolve(process.cwd(), `config/.env.${process.env.MODE}`),
}).parsed;

const env = {
  ...commonEnv,
  ...modeEnv,
};

const threads = os.cpus().length;

const isProduction = env.NODE_ENV === "production";

const styleLoaderOptions = {
  MiniCssExtractPluginLoader: {},
  "style-loader": {},
  "css-loader": {},
  "postcss-loader": {},
  "sass-loader": {},
  "less-loader": {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  "stylus-loader": {},
};

const getStyleLoaders = (styleLoader) => {
  return [
    isProduction
      ? {
          loader: MiniCssExtractPlugin.loader,
          options: styleLoaderOptions.MiniCssExtractPluginLoader,
        }
      : {
          loader: "style-loader",
          options: styleLoaderOptions["style-loader"],
        },
    {
      loader: "css-loader",
      options: styleLoaderOptions["css-loader"],
    },
    {
      loader: "postcss-loader",
      options: styleLoaderOptions["postcss-loader"],
    },
    styleLoader && {
      loader: styleLoader,
      options: styleLoaderOptions[styleLoader],
    },
  ].filter(Boolean);
};

module.exports = {
  entry: {
    app: {
      import: path.resolve(process.cwd(), "src/main.tsx"),
    },
  },
  module: {
    rules: [
      {
        // 当前文件匹配了规则后，则不在继续往下匹配
        oneOf: [
          // 解析图片
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset",
            generator: {
              publicPath: isProduction ? "/dist/" : "/",
              filename: "images/[hash][ext][query]",
            },
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
          },
          // 解析字体
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            type: "asset",
            generator: {
              publicPath: isProduction ? "/dist/" : "/",
              filename: "fonts/[hash][ext][query]",
            },
          },
          // 解析css文件
          {
            test: /\.css$/i,
            use: getStyleLoaders(),
          },
          // 解析s[ac]ss文件
          {
            test: /\.s[ac]ss$/i,
            use: getStyleLoaders("sass-loader"),
          },
          // 解析less文件
          {
            test: /\.less$/i,
            use: getStyleLoaders("less-loader"),
          },
          // 解析stylus文件
          {
            test: /\.styl$/i,
            use: getStyleLoaders("stylus-loader"),
          },
          // 解析ts与tsx文件
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "swc-loader",
                options: {
                  cacheDirectory: true, // 开启swc编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                },
              },
            ],
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
    extensions: [".js", ".ts", ".tsx", ".json", ".wasm"],
    modules: ["node_modules"],
    symlinks: false, // 减少 npm link 或 yarn link 解析工作量
  },
  stats: "minimal",
  plugins: [
    // 解决在浏览器环境中也可以获取环境变量
    new DefinePlugin({
      "process.env": JSON.stringify({ ...env, MODE: process.env.MODE }),
    }),
    new ESLintWebpackPlugin({
      extensions: [".ts", ".tsx"],
      // 开启缓存
      cache: true,
      emitWarning: false,
      // 缓存目录
      cacheLocation: path.resolve(process.cwd(), "node_modules/.cache/.eslintcache"),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      title: env.TITLE, // 使用了 html-loader 无效 （<%= htmlWebpackPlugin.options.title %>）
      filename: "index.html", // 打包后的文件名
      template: path.resolve(process.cwd(), "public/index.html"), // 打包的 html
      chunks: ["app"], // 对于 entry 配置
    }),
    new WebpackPluginPages()
  ],
};
