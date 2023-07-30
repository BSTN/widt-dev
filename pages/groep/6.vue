<template>
  <div class="group-chapter-6">
    <h1>6. Beat-the-bot!</h1>
    <videoPlayer
      file="/videos/test.mp4"
      v-if="!started"
      @next="group.startChapter('chapter6')"
    ></videoPlayer>
    <ChapterProgress chapter="chapter6" v-if="!results"></ChapterProgress>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter6"));
</script>
<style lang="less" scoped>
.group-chapter-6 {
}
</style>
