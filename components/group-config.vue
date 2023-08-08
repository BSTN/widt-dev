<template>
  <div class="group-config" :class="status">
    <div class="status"></div>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
const status = ref("");
const route = useRoute();
watch(route, (a, b, c) => {
  console.log({ a, b, c });
});

watch(
  () => group.connected,
  () => {
    status.value = group.connected ? "connected" : "disconnected";
  }
);
onMounted(async () => {
  if (!group.mounted) {
    await group.init();
  }
});
</script>
<style lang="less" scoped>
.group-config {
  padding: 0em;
  transition: all 0.15s;
  position: relative;
  z-index: 99;
}
.status {
  float: right;
  padding: 0.25em 0.5em;
  background: #e1de9b;
  --fg: #222;
  color: var(--fg);
  border-radius: 0.25em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 1em;
  position: fixed;
  right: 0;
  top: 0;
  border: 1px solid var(--fg);
  .connected & {
    background: #a5de93;
  }
  .disconnected & {
    background: #d85434;
  }
}
button.reset {
  position: fixed;
  bottom: 0;
  right: 0;
  background: #f00;
  padding: 0.25em 0.5em;
  border: 1px solid var(--fg);
  margin: 1rem;
  text-transform: uppercase;
  font-size: 0.8rem;
}
</style>
