<template>
  <div class="group-chapter-5" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Hulp van de bot</h1>
    <div class="subtitlequestion">
      Vergelijk jouw score uit onderdeel 4 met die van de bot.
    </div>
    <ChapterProgress chapter="chapter5" v-if="!results"></ChapterProgress>
    <videoPlayer
      file="/videos/5.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter5')"
      @restart="group.unStartChapter('chapter5')"
    ></videoPlayer>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="results" v-if="results">
      <div class="comments" v-if="questions.chapter5">
        <div class="q" v-for="(q, k) in questions.chapter5">
          <div class="commentbox">{{ q.text }}</div>
          <div class="user" v-for="user in group.users">
            {{ user.name }}:
            {{ user.answers["chapter5"] ? user.answers["chapter5"][k] : "--" }}
          </div>
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">volgende hoofdstuk</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/5.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter5"));
</script>
<style lang="less" scoped>
.group-chapter-5 {
}
.comments {
  // width: 40rem;
  max-width: 100%;
  margin: 2rem auto;
  text-align: left;
  display: grid;
  gap: 2rem;
  padding: 0rem 4rem;
  grid-template-columns: repeat(3, 1fr);
}
</style>
