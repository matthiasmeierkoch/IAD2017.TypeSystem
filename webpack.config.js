const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const config = require("config");

/*-------------------------------------------------*/

module.exports = {
  // webpack optimization mode
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",

  // entry file(s)
  entry: "./src/index.js",

  // output file(s) and chunks
  output: {
    library: "UserList",
    libraryTarget: "umd",
    libraryExport: "default",
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: config.get("publicPath")
  },

  // module/loaders configuration
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.s?css$/,

        use: [
          {
            loader: "style-loader",
            options: { sourceMap: config.get("sourcemap") }
          },
          {
            loader: "css-loader",
            options: { sourceMap: config.get("sourcemap") }
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: config.get("sourcemap") }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: config.get("sourcemap") }
          }
        ]
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    })
  ],

  // development server configuration
  devServer: {
    // must be `true` for SPAs
    historyApiFallback: true,

    // open browser on server start
    open: config.get("open")
  },

  // generate source map
  devtool:
    "production" === process.env.NODE_ENV
      ? "source-map"
      : "cheap-module-eval-source-map"
};
