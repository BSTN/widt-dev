<template>
  <div class="group-chapter-6" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>De gevaren van AI</h1>
    <videoPlayer
      file="/videos/6.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter6')"
      @restart="group.unStartChapter('chapter6')"
    ></videoPlayer>
    <ChapterProgress chapter="chapter6" v-if="!results"></ChapterProgress>
    <div class="results" v-if="results">
      Hier komen alle reacties, gesorteerd op score.
    </div>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="next">
      <button @click="group.next()">naar het einde</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/6.svg?component";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter6"));
</script>
<style lang="less" scoped>
.group-chapter-6 {
}
</style>
