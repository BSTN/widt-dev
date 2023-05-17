<template>
  <div class="group-main">
    <groupConfig></groupConfig>
    <notifications></notifications>
    <component
      :is="components[group.position]"
      v-if="!group.loading"
    ></component>
  </div>
</template>
<script lang="ts" setup>
import order from "@/content/order.yml";
const group = useGroupStore();
const components = [];
for (let i in order) {
  const x = order[i];
  components[i] = defineAsyncComponent(() => import(`./../${x.group}.vue`));
}
</script>
<style lang="less" scoped>
.group-main {
}
</style>
