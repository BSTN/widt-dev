<template>
  <div class="default">
    <div class="maintext">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.default {
  text-align: center;
}

:deep(h1) {
  font-size: 3rem;
  line-height: 1em;
  // padding-top: 0.2em;
  // font-weight: 500;
  text-align: center;
  margin-top: 2em;
  border: 0.08em solid var(--fg);
  border-radius: 0.25em;
  width: 7em;
  margin: 2em auto 0;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
  }
}
:deep(p) {
  width: 24em;
  max-width: 100%;
  margin: 0 auto 1em;
  text-align: left;
  font-size: 1rem;
  line-height: 1.4em;
}
</style>
