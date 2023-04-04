<template>
  <div class="user-config" :class="status">
    <div class="status">
      {{ status }}
      <div class="loading" v-if="user.loading">loading...</div>
    </div>
    <button class="reset" @click="user.reset()">reset</button>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/userstore'
const user = useUserStore();
const status = ref("");
watch(
  () => user.connected,
  () => {
    status.value = user.connected ? "connected" : "disconnected";
  }
);
onMounted(() => {
  user.init();
});
</script>
<style lang="less" scoped>
.user-config {
  padding: 0em;
  border-bottom: 1px solid var(--fg);
  transition: all 0.15s;
}
.status {
  float: right;
  padding: 0.25em 0.5em;
  background: #e1de9b;
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
