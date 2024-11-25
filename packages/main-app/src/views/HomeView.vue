<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-if="isLoadingComponent">Loading HelloWorld.vue</div>
    <HelloWorld msg="Main App Use Module Federation！" />
  </div>
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
