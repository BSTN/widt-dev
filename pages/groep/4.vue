<template>
  <div class="group-chapter-4" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Een ‘goede’ discussie</h1>
    <ChapterProgress chapter="chapter4" v-if="!results"></ChapterProgress>
    <videoPlayer
      file="/videos/4.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter4')"
      @restart="group.unStartChapter('chapter4')"
    ></videoPlayer>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="results" v-if="results">
      <div class="comments">
        <div class="q commentbox" v-for="q in questions.chapter3">
          {{ q.text }}
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">volgende hoofdstuk</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/4.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter4"));
</script>
<style lang="less" scoped>
.group-chapter-4 {
}
.comments {
  width: 40rem;
  max-width: 100%;
  margin: 2rem auto;
  text-align: left;
}
</style>
