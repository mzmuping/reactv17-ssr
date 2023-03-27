require("asset-require-hook")({
  extensions: ["svg", "css", "less", "jpg", "png", "gif"],
  name: "/static/[name].[ext]",
});
require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: [
    [
      "css-modules-transform",
      {
        camelCase: true,
        extensions: [".css", ".scss"],
      },
    ],
    "dynamic-import-node",
  ],
});
require("babel-polyfill");
require("module-alias/register");
require("./src/server");
