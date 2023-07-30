<template>
  <div class="user-chapter-5">
    <userPause v-if="!started || finished"></userPause>
    <div class="questions" v-if="!finished">
      <div class="q" v-for="(q, k) in questions.chapter5">
        <div class="commentbox">{{ q.text }}</div>
        <botSlider :number="k" chapter="chapter5" @change="update"></botSlider>
      </div>
    </div>
    <div class="done" v-if="!finished">
      <button class="contrast" @click="user.finish('chapter5')">
        Klik hier als je klaar bent!
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import questions from "@/content/questions.yml";
const user = useUserStore();
const value = 0;
const { getAnswer } = storeToRefs(user);

function update({ data, k }) {
  user.setAnswer({ chapter: "chapter5", k, answer: data });
}
const started = computed(() =>
  user.started ? user.started.includes("chapter5") : false
);
const finished = computed(() =>
  user.finished ? user.finished.includes("chapter5") : false
);
</script>
<style lang="less" scoped>
.user-chapter-5 {
}
.questions {
  width: 40rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  text-align: left;
  background: var(--testbg);
}
</style>
