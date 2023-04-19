<template>
  <div class="split-screen">
    <div class="left"><slot name="left"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.split-screen {
  display: flex;
  font-size: 1.25rem;
  max-width: 120vh;
  margin: 0 auto;
  // border-top: 1px solid var(--bc);
  > div {
    width: 50%;
    padding: 2rem 2rem 2rem 0;
  }
}
</style>
