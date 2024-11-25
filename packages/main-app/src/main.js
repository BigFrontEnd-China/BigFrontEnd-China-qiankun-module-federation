import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

import { start, registerMicroApps, initGlobalState } from "qiankun";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ArcoVue);
app.mount("#app");

registerMicroApps(
  [
    {
      name: "micro-app-a",
      entry: "//localhost:8081",
      container: "#container",
      activeRule: "/micro-app-a",
      props: {
        name: "micro-app-a",
      },
    },
    {
      name: "micro-app-b",
      entry: "//localhost:8082",
      container: "#container",
      activeRule: "/micro-app-b",
      props: {
        name: "micro-app-b",
      },
    },
  ],
  {
    beforeLoad: (app) => console.log("before load", app.name),
    beforeMount: [(app) => console.log("before mount", app.name)],
    afterUnmount: [
      (app) => {
        console.log(
          "[LifeCycle] after unmount %c%s",
          "color: green;",
          app.name
        );
      },
    ],
  }
);
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: "qiankun",
});

onGlobalStateChange((value, prev) =>
  console.log("[onGlobalStateChange - master]:", value, prev)
);

setGlobalState({
  ignore: "master",
  user: {
    name: "master",
  },
});
start();
