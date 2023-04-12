<template>
  <div class="group group-layout">
    <groupConfig></groupConfig>
    <div class="maintext" v-if="!group.loading"><slot></slot></div>
    <notifications></notifications>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
</script>
<style lang="less" scoped>
.group {
}

.maintext {
  padding: 4em;
  :deep(p) {
    width: 30rem;
    max-width: 100%;
    margin: 0 auto 1.4rem;
    line-height: 1.4em;
  }
  :deep(span) {
    font-size: 0.6em;
    width: 30rem;
    margin: 0 auto 0;
    opacity: 0.5;
  }
}
</style>
