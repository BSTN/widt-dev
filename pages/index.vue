<template>
  <div class="group-start" v-if="!group.loading">
    <VideoPlayer
      file="/videos/intro.mp4"
      :init-started="false"
      :class="{ started }"
      @next="started = true"
      @restart="started = false"
    ></VideoPlayer>
    <!-- <logo class="logo"></logo> -->
    <div class="split">
      <group-create></group-create>
      <div class="instructions">
        <p>
          Doe mee door de camera van je telefoon op het plaatje te richten en
          klik vervolgens op de link op je scherm.
        </p>
        <p>Tip: Je kan de link ook direct delen via bijvoorbeeld Whatsapp.</p>
      </div>
    </div>
    <allUsers type="small"></allUsers>
    <button @click="group.next(1)">
      Iedereen gereed? Klik dan hier om te beginnen!
    </button>
  </div>
</template>
<script lang="ts" setup>
import logo from "@/assets/logo/logo-diamond.svg?component";
const group = useGroupStore();
const config = useRuntimeConfig();
const started = ref(false);
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
  margin: 5rem auto;
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
    button {
      margin: 0;
      border: 1px solid var(--fg);
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
