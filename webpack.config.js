const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "styles.css",
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "webpack-report.html",
    openAnalyzer: false,
  }),
];

module.exports = {
  mode: "development",
  context: path.join(__dirname, "src"),
  devtool: "source-map",
  entry: {
    app: "./client.js",
  },
  resolve: {
    modules: [path.resolve("./src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/[name][ext]",
          publicPath: "/",
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins,
};