<template>
  <div class="default">
    <slot></slot>
    <nuxt-link :to="page.next" class="next">{{
      page.nexttext || "volgende"
    }}</nuxt-link>
  </div>
</template>
<script lang="ts" setup>
const { page } = useContent();
</script>
<style lang="less" scoped>
.default {
  text-align: center;
}
.next {
  background: var(--fg);
  color: var(--bg);
  padding: 0.5rem 1rem;
  border-radius: 0.25em;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  margin: 1em auto;
  text-align: center;
  position: relative;
  z-index: 99;
}
</style>
