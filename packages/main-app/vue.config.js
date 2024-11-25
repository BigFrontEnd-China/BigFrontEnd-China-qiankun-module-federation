const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("@module-federation/enhanced");
const packageData = require("./package.json");
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
        filename: "mainApp.js",
        exposes: {},
        remotes: {
          // 引入
          microApp: "microApp@http://localhost:8081/microApp.js",
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
  },
});
