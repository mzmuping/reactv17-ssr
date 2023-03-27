module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: true,
          },
          modules: "commonjs",
          useBuiltIns: "usage",
          corejs: { version: 3, proposals: true },
        },
      ],
      "@babel/preset-react",
    ],
  };
};
