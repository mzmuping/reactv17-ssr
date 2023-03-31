const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { getPlugins } = require("./tools");
const plugins = getPlugins();
console.log("process.env.NODE_ENV===", process.env.APP_URL);
module.exports = {
  context: path.join(__dirname, "../src"),
  entry: {
    app: "./client.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    modules: [path.resolve("../src"), "node_modules"],
    alias: {
      "@src": path.resolve(__dirname, "../src"),
      "@utils": path.resolve(__dirname, "../src/utils"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
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
  plugins,
};
