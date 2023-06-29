<template>
  <div class="default">
    <UserConfig v-if="isUser" />
    <GroupConfig v-if="isGroup" />
    <div v-if="isGroup">
      <GroupRoute></GroupRoute>
    </div>
    <notifications />
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
const { path } = useRoute();
const isUser = computed(() => {
  return path.startsWith("/deelnemer");
});
const isGroup = computed(() => {
  return path.startsWith("/groep") || path === "/";
});
</script>
<style lang="less" scoped>
.default {
  text-align: center;
}
</style>
