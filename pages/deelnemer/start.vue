<template>
  <div class="start">
    <div class="instructions" v-if="!user.userid">
      <h1>Welkom bij Wie is de trol?!</h1>
      <p>
        Hieronder zie je je gegenereerde gebruikersnaam en icoon, zo kan je
        jezelf en je resultaten herkennen gedurende het spel.
      </p>
      <p>
        Tip: Je kan (nu nog) een andere naam en icoon genereren door op het
        icoontje te klikken.
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

h1 {
  font-size: 2rem;
}
.instructions {
  text-align: center;
  padding: 1rem 1rem;
  // width: 30rem;
  max-width: 100%;
  margin: 0 auto;
  :deep(p) {
    margin-bottom: 1em;
  }
}
</style>
