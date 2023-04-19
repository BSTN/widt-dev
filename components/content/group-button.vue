<template>
  <div class="group-button">
    <button @click="go()" class="contrast">Start</button>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
const { action } = defineProps({
  action: {
    type: String,
    default: () => "",
  },
});

function go() {
  if (action === "next") {
    group.next();
  }
}
</script>
<style lang="less" scoped>
.group-button {
  margin: 2rem 0;
  text-align: center;
  font-size: 1.5rem;
}
</style>
