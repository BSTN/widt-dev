<template>
  <div class="group-start">
    <group-create></group-create>
    <div class="instructions">
      Doe mee door de camera van je telefoon op dit onderstaande plaatje te
      richten en klik vervolgens op de link op je scherm. Je kan vervolgens ook
      de link delen in bijvoorbeeld een (groep) chat via
      WhatsApp/Signal/Telegram.
    </div>
    <allUsers type="small"></allUsers>
    <groupButton action="next"></groupButton>
  </div>
</template>
<script lang="ts" setup></script>
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
