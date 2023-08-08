<template>
  <div class="group-start" v-if="!group.loading">
    <logo class="logo"></logo>
    <div class="split">
      <group-create></group-create>
      <div class="instructions">
        <p>
          Doe mee door de camera van je telefoon op het plaatje te richten en
          klik vervolgens op de link op je scherm.
        </p>
        <p>
          Tip: De docent of leerlingen onderling kunnen de link ook delen in
          bijvoorbeeld een via WhatsApp/Signal/Telegram of ander chat/mail
          programma.
        </p>
      </div>
    </div>
    <allUsers type="small"></allUsers>
    <button @click="group.next(1)">Start</button>
  </div>
</template>
<script lang="ts" setup>
import logo from "@/assets/logo/logo-diamond.svg?component";
const group = useGroupStore();
const config = useRuntimeConfig();
onMounted(() => {
  console.log(config.public.URL, config.public.BASE);
});
</script>
<style lang="less" scoped>
.group-start {
  padding: 1rem 1rem;
  background: var(--testbg);
  min-height: 100vh;
}
.logo {
  width: 5rem;
  margin-bottom: 1rem;
}
.split {
  max-width: 50rem;
  margin: 0 auto;
  // margin: 4rem auto;
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1rem;
  // border: 1px solid var(--bc);
  border-radius: 1.5rem;
  background: var(--bg);
  .instructions {
    width: 24rem;
    max-width: 100%;
    padding-left: 2rem;
    p {
      margin-bottom: 1rem;
    }
  }
}
button {
  border: 0;
  &:hover {
    background: #fff;
    color: var(--fg);
  }
}
</style>
