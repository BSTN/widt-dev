<template>
  <div class="group-chapter-2">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Trollen vangen</h1>
    <div class="subtitlequestion">
      Welke accounts vertonen volgens jou trolgedrag?
    </div>
    <videoPlayer
      file="/videos/2.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter2')"
      @restart="group.unStartChapter('chapter2')"
    ></videoPlayer>
    <ChapterProgress chapter="chapter2" v-if="!results"></ChapterProgress>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="results" v-if="results">
      <div class="q" v-for="(q, k) in questions['chapter2']">
        <div class="name">{{ q.name }}</div>
        <div class="trol">
          <div class="circle">{{ trol(k).length }}</div>
        </div>
        <div class="geentrol">
          <div class="circle">{{ geentrol(k).length }}</div>
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">volgende hoofdstuk</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/2.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter2"));
function trol(k: Number) {
  return group.users.filter((x) => {
    return x.answers["chapter2"][k] === true;
  });
}
function geentrol(k: Number) {
  return group.users.filter((x) => {
    return x.answers["chapter2"][k] === false;
  });
}
</script>
<style lang="less" scoped>
.group-chapter-2 {
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
