const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const getPlugins = () => {
  const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ];

  if (process.env.NODE_ENV !== "production") {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
      })
    );
  }

  return plugins;
};

module.exports = {
  getPlugins,
};
