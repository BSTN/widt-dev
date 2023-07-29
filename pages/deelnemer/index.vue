<template>
  <div class="deelnemer-index">
    <logo class="logo"></logo>
    <div class="txt">
      Je bent momenteel niet (meer) onderdeel van een groep.
    </div>
  </div>
</template>
<script lang="ts" setup>
import logo from "@/assets/logo/logo-diamond.svg?component";
</script>
<style lang="less" scoped>
.deelnemer-index {
}
.logo {
  width: 20rem;
  height: 20rem;
  max-width: 80%;
}
.txt {
  padding: 2rem;
}
</style>
