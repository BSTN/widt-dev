<template>
  <div class="bot-slider">
    <label>niet-constructief</label>
    <label>constructief</label>
    <Slider
      v-model="value"
      :min="0"
      :max="1"
      :step="0.01"
      tooltipPosition="top"
      :lazy="false"
      @update="$emit('value:update', value)"
    ></Slider>
    {{ value }}
  </div>
</template>
<script lang="ts" setup>
import Slider from "@vueform/slider";
const value = ref(0);
</script>
<style lang="less" scoped>
.bot-slider {
}
:deep(.slider-target) {
  background: var(--bg2);
  border-radius: 0.25em;
}
</style>
