<template>
  <div class="group-chapter-3" v-if="!group.loading">
    <h1 @click="group.unStartChapter('chapter3')">3. Labels</h1>
    <videoPlayer
      file="/videos/test.mp4"
      v-if="!started"
      @next="group.startChapter('chapter3')"
    ></videoPlayer>
    <ChapterProgress chapter="chapter3" v-if="!results"></ChapterProgress>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="results" v-if="results">
      <div class="q" v-for="(q, k) in questions['chapter3']">
        {{ q.text }}
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
const started = computed(() => group.started.includes("chapter3"));
</script>
<style lang="less" scoped>
.group-chapter-3 {
}

.results {
  width: 20rem;
  margin: 0 auto;
}
.q {
  display: flex;
  margin: 0 auto 1em;
  width: 100%;
  .name {
    flex: 1;
    text-align: left;
  }
}

.circle {
  padding: 0;
  line-height: 1.5rem;
  border-radius: 100%;
  width: 1.5rem;
  height: 1.5rem;
  background: var(--gbg);
  color: var(--gfg);
  .geentrol & {
    background: var(--rbg);
    color: var(--rfg);
  }
}
.trol,
.geentrol {
  padding: 0 0 0 0.5em;
}
</style>
