<!--
*@Description:描述
*@Author: Jackson
*@CreateTime: 2024年11月19日 14:05:24
*@UpdateTime: ''
-->
<template>
  <div><a-rate :default-value="value" readonly /></div>
</template>
<script>
export default {
  name: "ExposeRate",
  props: {
    value: Number,
  },
};
</script>
<style lang="less" scoped></style>
