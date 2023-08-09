<template>
  <div class="group-chapter-1">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Goed en Kwaad.</h1>
    <div class="subtitlequestion">
      Welke reacties vind jij toelaatbaar en welke niet?
    </div>
    <!-- <button @click="group.startChapter('chapter1')">START</button>
    <button @click="group.unStartChapter('chapter1')">unSTART</button> -->
    <videoPlayer
      file="/videos/1.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter1')"
      @restart="group.unStartChapter('chapter1')"
    ></videoPlayer>
    <!-- <finished name="chapter1"></finished> -->
    <ChapterProgress chapter="chapter1" v-if="!results"></ChapterProgress>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="results" v-if="results">
      <div class="q" v-for="(q, k) in questions['chapter1']">
        <div class="text commentbox">{{ q }}</div>
        <div class="toegestaan">
          <div class="circle">{{ toegestaan(k).length }}</div>
        </div>
        <div class="verwijderd">
          <div class="circle">{{ verwijderd(k).length }}</div>
        </div>
      </div>
      <div class="next">
        <button @click="group.next()">volgende hoofdstuk</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/1.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const started = computed(() => group.started.includes("chapter1"));
const results = ref(false);
function toegestaan(k: Number) {
  return group.users.filter((x) => {
    return x.answers["chapter1"][k] === true;
  });
}
function verwijderd(k: Number) {
  return group.users.filter((x) => {
    return x.answers["chapter1"][k] === false;
  });
}
</script>
<style lang="less" scoped>
.group-chapter-1 {
}

.q {
  line-height: 1em;
  display: flex;
  width: 40rem;
  max-width: 100%;
  margin: 0 auto 0;
  .text {
    width: 100%;
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
  .verwijderd & {
    background: var(--rbg);
    color: var(--rfg);
  }
}
.toegestaan,
.verwijderd {
  padding: 0 0 0 0.5em;
}
</style>
