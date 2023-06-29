<template>
  <div class="user-pause">
    <!-- <loader></loader> -->
    <logoSpinner></logoSpinner>
    <div class="center">[Kijk naar het grote scherm]</div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.user-pause {
  width: 100%;
  height: 90vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.center {
  align-self: center;
  margin: 1em auto;
}
</style>
