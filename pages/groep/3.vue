<template>
  <div class="group-chapter-3" v-if="!group.loading">
    <chapterlogo class="chapterlogo"></chapterlogo>
    <h1>Labelen</h1>
    <div class="subtitlequestion">
      Deelnemers aan online platforms hebben verschillende intenties. Kun jij
      per reactie aangeven wat je denkt dat de bedoeling is van de schrijver?
    </div>
    <videoPlayer
      file="/videos/3.mp4"
      :class="{ started }"
      @next="group.startChapter('chapter3')"
      @restart="group.unStartChapter('chapter3')"
    ></videoPlayer>
    <ChapterProgress chapter="chapter3" v-if="!results"></ChapterProgress>
    <button @click="results = true" v-if="!results">
      vergelijk resultaten
    </button>
    <div class="results" v-if="results">
      <div class="q" v-for="(q, k) in questions['chapter3']">
        <div class="commentbox">
          {{ q.text }}
        </div>
        <div class="answers">
          <div
            v-for="(users, label) in labelCountPerComment[k]"
            v-show="users.length > 0"
          >
            {{ label }} <sup>{{ users.length }}</sup>
          </div>
        </div>
      </div>
    </div>
    <div class="next" v-if="results">
      <button @click="group.next()">volgende hoofdstuk</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import chapterlogo from "@/assets/chapters/3.svg?component";
import questions from "@/content/questions.yml";
const group = useGroupStore();
const results = ref(false);
const started = computed(() => group.started.includes("chapter3"));

const labelCountPerComment = computed(() => {
  return questions["chapter3"].map((x, k) => {
    const values = {};
    const labels = questions["chapter3-labels"];
    labels.map((label) => {
      values[label] = [];
    });
    for (let u in group.users) {
      if (
        group.users[u].answers["chapter3"] &&
        group.users[u].answers["chapter3"][k]
      ) {
        values[group.users[u].answers["chapter3"][k]].push({
          userid: group.users[u].userid,
          name: group.users[u].name,
        });
      }
    }
    return values;
  });
});
</script>
<style lang="less" scoped>
.group-chapter-3 {
}

.results {
  // width: 20rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}
.q {
  // display: flex;
  margin: 0 auto 1em;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: left;
  .name {
    flex: 1;
    text-align: left;
  }
}

sup {
  vertical-align: super;
  font-size: 0.7rem;
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
