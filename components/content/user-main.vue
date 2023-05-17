<template>
  <div class="user-main">
    <UserConfig />
    <notifications />
    <component :is="components[user.position]" v-if="!user.loading"></component>
  </div>
</template>
<script lang="ts" setup>
import order from "@/content/order.yml";
const user = useUserStore();
const components = [];
for (let i in order) {
  const x = order[i];
  components[i] = defineAsyncComponent(() => import(`./../${x.user}.vue`));
}
</script>
<style lang="less" scoped>
.user-main {
}
</style>
