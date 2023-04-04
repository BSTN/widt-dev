<template>
  <div class="blokjes">
    <div v-for="i in 2000"></div>
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
  grid-template-columns: repeat(20, 1fr);
  z-index: 9;
  mix-blend-mode: darken;
  mix-blend-mode: lighten;
  > div {
    // border: 0.5px solid #777;
    height: 3rem;
    transition-delay: 1.5s;
    transition-duration: 1s;
    border:2px solid var(--bg);
    border-radius: 0.5em;
    &:hover {
      background: #f7ffbd;
      // transform: scale(-1);
      transition: all 0.1s;
      transition-delay: 0s;
    }
  }
}
</style>
