<template>
  <div class="start">
    <div class="instructions" v-if="!user.userid">
      <p>
        Hieronder zie je je gegenereerde gebruikersnaam en icoon, zo kan je
        jezelf en je resultaten herkennen gedurende het spel.
      </p>
      <p>
        Tip: Je kan een andere genereren door op het icoontje met naam te
        klikken.
      </p>
    </div>
    <UserCreate></UserCreate>
  </div>
</template>
<script lang="ts" setup>
const user = useUserStore();
</script>
<style lang="less" scoped>
.start {
  background: var(--testbg);
  min-height: 100vh;
}
.instructions {
  text-align: left;
  padding: 1rem 1rem;
  width: 30rem;
  max-width: 100%;
  margin: 0 auto;
  :deep(p) {
    margin-bottom: 1em;
  }
}
</style>
