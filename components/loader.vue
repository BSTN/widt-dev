<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
@import "@/less/ease.less";
.loader {
  padding: 2rem;
  div {
    @s: 1rem;
    display: inline-block;
    font-size: @s;
    width: @s;
    height: @s;
    border: 0.05em solid var(--fg);
    border-radius: 100%;
    margin: 0.35 * @s;
    box-sizing: border-box;
    @l: 1.5s;
    animation: loading @l @easeInQuad 0s infinite forwards;
    animation: loading @l linear 0s infinite forwards;
    @keyframes loading {
      30% {
        border-width: 0.05em;
      }
      70% {
        border-width: 0.49em;
      }
      100% {
        border-width: 0.05em;
      }
    }
    &:nth-child(2) {
      animation-delay: calc(@l / 4);
    }
    &:nth-child(3) {
      animation-delay: calc(@l / 2);
    }
    &:nth-child(4) {
      animation-delay: calc(@l / 4 * 3);
    }
  }
}
</style>
