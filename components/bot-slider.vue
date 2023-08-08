<template>
  <div class="bot-slider">
    <div class="labels">
      <label>← niet-constructief</label>
      <label>constructief →</label>
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
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
const user = useUserStore();

import Slider from "@vueform/slider";
const { number, data, chapter } = defineProps(["data", "number", "chapter"]);
const emit = defineEmits(["change"]);
const { getAnswer } = storeToRefs(user);

watch(
  () => data,
  () => {
    val;
    console.log(data);
  }
);

const val = computed({
  get() {
    return user.getAnswer({ chapter, k: number }) || 0;
  },
  set(val) {
    emit("change", { data: val, k: number });
  },
});
</script>
<style lang="less" scoped>
.bot-slider {
}
.labels {
  display: flex;
  > label {
    flex: 1;
    opacity: 0.5;
    font-size: 0.6rem;
    &:nth-child(2) {
      text-align: right;
    }
  }
}
.frame {
  position: relative;
  margin-bottom: 2rem;
}
.theslider {
  background: var(--bg2);
  border-radius: 0.25em;
  --slider-bg: var(--bg2);
  --slider-connect-bg: var(--fg);
  :deep(.slider-origin) {
    // right: 0;
    // left: auto;
    // border: 2px solid var(--fg);
  }
}
</style>
