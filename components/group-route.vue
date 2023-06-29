<template>
  <div class="group-route"></div>
</template>
<script lang="ts" setup>
import order from "@/content/order.yml";
const group = useGroupStore();
const route = useRoute();
watch(route, (val) => {
  const orderPosition = route.path.replace("/groep/", "");
  const index = order.findIndex(
    (x) => String(x.group) === String(orderPosition)
  );
  if (index !== group.position) {
    group.next(index);
  }
});
</script>
<style lang="less" scoped>
.group-route {
}
</style>
