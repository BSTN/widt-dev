<template>
  <div class="logo-spinner">
    <logo></logo>
  </div>
</template>
<script lang="ts" setup>
import logo from "@/assets/logo/logo-diamond.svg";
</script>
<style lang="less" scoped>
.logo-spinner {
  :deep(svg) {
    width: 12rem;
    height: 12rem;
  }
  animation: diamondspinner 2s @easeInOutSine 0s infinite forwards;
  @keyframes diamondspinner {
    // 20% {
    //   transform: rotate(360deg);
    // }
    // 20.1% {
    //   transform: rotate(0deg);
    // }
    39% {
      // transform: scaleY(0);
      transform: rotateX(360deg);
    }
    40% {
      transform: scaleY(1);
    }
  }
}
</style>
