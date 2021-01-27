const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const srcRoot = "./src/consumer/";

module.exports = {
  mode: "development",
  entry: `${srcRoot}index.js`,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
  resolve: {
    fallback: {
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_DEBUG": false,
      "process.env.DEBUG": false,
    }),
    new webpack.EnvironmentPlugin([
      "EVENTHUB_CONSUMER_GROUP",
      "EVENTHUB_CONNECTION_STRING",
      "EVENTHUB_NAME",
    ]),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: ["process/browser"],
    }),
    new HtmlWebpackPlugin({ template: `${srcRoot}index.html` }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    port: 9080,
  },
};
