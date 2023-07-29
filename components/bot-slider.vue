<template>
  <div class="bot-slider">
    <div class="labels">
      <label>niet-constructief</label>
      <label>constructief</label>
    </div>
    <div class="frame">
      <!-- {{ val }} -->
      <Slider
        class="theslider"
        v-model="val"
        :min="0"
        :max="1"
        :step="0.01"
        :tooltips="false"
        tooltipPosition="top"
        :lazy="false"
      ></Slider>
    </div>
    val:{{ val }}, data:{{ data }}
    <button @click="val = Math.random()">click</button>
    <!-- {{ value }} -->
  </div>
</template>
<script lang="ts" setup>
import Slider from "@vueform/slider";
const { number, data } = defineProps(["data", "number"]);
const emit = defineEmits(["change"]);

watch(
  () => data,
  () => {
    val;
    console.log(data);
  }
);

const val = computed({
  get() {
    return data;
  },
  set(val) {
    emit("change", { data: val, k: number });
  },
});
</script>
<style lang="less" scoped>
// @import "@/node_modules/@vueform/slider/themes/default.css";
.bot-slider {
}
.labels {
  display: flex;
  > label {
    flex: 1;
    opacity: 0.5;
    font-size: 0.6rem;
  }
}
.frame {
  position: relative;
}
.theslider {
  background: var(--bg2);
  border-radius: 0.25em;
  :deep(.slider-origin) {
    // right: 0;
    // left: auto;
    // border: 2px solid var(--fg);
  }
}
</style>
