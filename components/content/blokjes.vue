<template>
  <div class="blokjes">
    <div v-for="i in 3000"></div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.blokjes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(70, 1fr);
  z-index: 9;
  // mix-blend-mode: darken;
  // mix-blend-mode: lighten;
  > div {
    // border: 0.5px solid #777;
    height: calc(100vw / 70);
    height: 0.25rem;
    border-radius: 100%;
    box-sizing: border-box;
    position: relative;
    &:before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      left: calc(50% - 0.5rem);
      top: calc(50% - 0.5rem);
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
      border: 1px solid var(--fg);
      transition-delay: 1.5s;
      transition-duration: 1s;
    }
    &:hover {
      &:before {
        border: 0.35rem solid var(--fg);
        // background: var(--fg);
        // transform: scale(-1);
        transition: all 0.000001s;
        transition-delay: 0s;
      }
    }
  }
}
</style>
