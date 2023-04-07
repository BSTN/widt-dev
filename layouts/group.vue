<template>
  <div class="group group-layout">
    <groupConfig></groupConfig>
    <div class="maintext"><slot></slot></div>
    <notifications></notifications>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.group {
}

.maintext {
  padding: 4em;
  :deep(p) {
    width: 30rem;
    margin: 0 auto 2rem;
    line-height: 1.4em;
  }
  :deep(h6) {
    font-size: 0.6rem;
    width: 30rem;
    margin: 0 auto 1rem;
  }
}
</style>
