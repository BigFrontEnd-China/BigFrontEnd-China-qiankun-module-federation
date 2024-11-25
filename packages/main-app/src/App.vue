<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/micro-app-a">micro-app-a</router-link> |
    <router-link to="/micro-app-b">micro-app-b</router-link>
    <div v-if="isLoadingComponent">Loading HelloWorld.vue</div>
    <HelloWorld msg="Main App Container Use Module Federation！" />
    <HelloWorld msg="MainXX App Container Use Module Federation！" />
  </nav>
  <router-view />
  <div id="container"></div>
</template>
<script setup>
import { defineAsyncComponent, ref } from "vue";
const isLoadingComponent = ref(true);

const HelloWorld = defineAsyncComponent(() =>
  import("module_federation/HelloWorld").finally(() => {
    isLoadingComponent.value = false;
  })
);
</script>
<style lang="less">
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.appContainer {
  background: #ccc;
  padding: 20px;
}
</style>
