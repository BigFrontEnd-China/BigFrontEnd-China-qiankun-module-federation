const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
const { ModuleFederationPlugin } = require("@module-federation/enhanced");

const packageData = require("./package.json");
const port = process.env.port || 8081;

module.exports = defineConfig({
  transpileDependencies: true,
  //publicPath: process.env.NODE_ENV === "production" ? "/micro-app-a" : "/",
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
        name: "microApp",
        filename: "microApp.js",
        exposes: {
          "./ExposeRate": "./src/components/ExposeRate.vue",
        },
        remotes: {
          // 引入
          module_federation:
            "module_federation@http://localhost:8083/remoteEntry.js",
        },
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
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${packageData.name}`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${packageData.name}`,
    },
  },
});
