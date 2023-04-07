<template>
  <div class="all-users">
    All users:
    {{ users }}
  </div>
</template>
<script lang="ts" setup>
const { users } = useGroupStore();
</script>
<style lang="less" scoped>
.all-users {
  text-align: center;
}
</style>
