<template>
  <div class="group-intro">
    <VideoPlayer file="/videos/intro.mp4" @next="group.next()"></VideoPlayer>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
</script>
<style lang="less" scoped>
.group-intro {
}
</style>
