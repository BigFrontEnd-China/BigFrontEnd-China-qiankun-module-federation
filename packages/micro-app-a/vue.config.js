const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const package = require("./package");
const port = process.env.port || 8081;

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/micro-app-a" : "/",
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
    plugins: [
      new ModuleFederationPlugin({
        name: "main_app",
        filename: "remoteEntry.js",
        exposes: {},
        remotes: {
          // 引入
          module_federation:
            "module_federation@http://localhost:8083/remoteEntry.js",
        },
        shared: {
          vue: {
            requiredVersion: package.dependencies["vue"],
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
      library: `${package.name}`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${package.name}`,
    },
  },
});
