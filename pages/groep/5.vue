<template>
  <div class="group-chapter-5" v-if="!group.loading">
    <h1>5. Battle-the-bot!</h1>
    <ChapterProgress chapter="chapter5" v-if="!results"></ChapterProgress>
    <videoPlayer
      file="/videos/test.mp4"
      v-if="!started"
      @next="group.startChapter('chapter5')"
    ></videoPlayer>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="results" v-if="results">
      <div class="comments">
        <div class="q commentbox" v-for="q in questions.chapter5">
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
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter5"));
</script>
<style lang="less" scoped>
.group-chapter-5 {
}
.comments {
  width: 40rem;
  max-width: 100%;
  margin: 2rem auto;
  text-align: left;
}
</style>
