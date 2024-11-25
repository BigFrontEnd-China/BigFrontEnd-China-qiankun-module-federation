const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;
const package = require("./package");
const port = process.env.port || 8080;

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: "./src/main.js",
    },
  },
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
  },
});
