const { defineConfig } = require("@vue/cli-service");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced");
const packageData = require("./package.json");
const port = process.env.port || 8083;

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "./src/main.js",
    },
  },
  publicPath: "auto",
  devServer: {
    port,
    open: {
      target: [`http://localhost:${port}`],
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: false,
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "module_federation", // 模块名称
        filename: "remoteEntry.js",
        exposes: {
          // 对外暴露的组件
          "./HelloWorld": "./src/components/HelloWorld.vue",
          "./ExposeRate": "./src/components/ExposeRate.vue",
        },
        remotes: {},
        shared: {
          vue: {
            requiredVersion: packageData.dependencies["vue"],
            singleton: true,
            eager: true,
            shareScope: "default",
          },
        },
      }),
    ],
  },
});
