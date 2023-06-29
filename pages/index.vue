<template>
  <div class="group-start" v-if="!group.loading">
    <group-create></group-create>
    <div class="instructions">
      Doe mee door de camera van je telefoon op het plaatje te richten en klik
      vervolgens op de link op je scherm. Je kan de link ook delen in
      bijvoorbeeld een (groep) chat via WhatsApp/Signal/Telegram.
    </div>
    <allUsers type="small"></allUsers>
    <button @click="group.next(1)">volgende</button>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
</script>
<style lang="less" scoped>
.group-start {
  width: 50rem;
  margin: 4rem auto;
  .instructions {
    margin: 0 auto;
    width: 24rem;
    max-width: 100%;
  }
}
</style>
