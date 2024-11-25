<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-if="isLoadingComponent">Loading HelloWorld.vue</div>
    <HelloWorld msg="Micro App A Use Module Federation！" />
    <HelloWorld msg="Micro App AA Use Module Federation！" />
    <ExposeRate :value="5" />
  </div>
</template>

<script setup>
import ExposeRate from "../components/ExposeRate";
import { defineAsyncComponent, ref } from "vue";
const isLoadingComponent = ref(true);

const HelloWorld = defineAsyncComponent(() =>
  import("module_federation/HelloWorld").finally(() => {
    isLoadingComponent.value = false;
  })
);
</script>
