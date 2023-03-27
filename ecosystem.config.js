module.exports = {
  apps: [
    {
      name: "website",
      script: "./index.js",
      env: {
        //默认
        NODE_ENV: "production",
        PORT: 8000,
      },
      env_production: {
        //pm2 start ecosystem.config.js --env production
        NODE_ENV: "production",
        PORT: 8001,
      },
    },
    // {
    //   name: "worker",
    //   script: "worker.js",
    // },
  ],
};
