<template>
  <div v-html="icon" v-if="icon" class="icon" />
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string;
}>();

const icon = ref('')

// Auto-load icons
const icons = Object.fromEntries(
  Object.entries(import.meta.glob("~/assets/icons/*.svg", { as: "raw" })).map(
    ([key, value]) => {
      const filename = key.split("/").pop()!.split(".").shift();
      return [filename, value];
    }
  )
);

// Lazily load the icon
icon.value =
  props.icon &&
  (await icons?.[props.icon]?.()).replaceAll("#000000", "currentColor");

onUpdated(async () => {
  icon.value = props.icon && (await icons?.[props.icon]?.()).replaceAll("#000000", "currentColor");
})
</script>
<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  color:inherit;
  :deep(svg) {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
