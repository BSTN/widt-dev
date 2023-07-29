<template>
  <div class="user-chapter-4">
    <userPause v-if="!started || finished"></userPause>
    <div class="questions" v-if="!finished">
      <div class="question">
        Welke van de vorige berichten zou jij uitlichten? Je mag er 1 kiezen.
      </div>
      <div v-for="(q, k) in questions.chapter3" class="commentscontainer">
        <div class="commentbox">
          {{ q.text }}
        </div>
      </div>
    </div>
    <div class="done" v-if="!finished">
      <button class="contrast" @click="user.finish('chapter4')">
        Klik hier als je klaar bent!
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
const user = useUserStore();
import questions from "@/content/questions.yml";
const { getAnswer } = storeToRefs(user);
const started = computed(() =>
  user.started ? user.started.includes("chapter4") : false
);
const finished = computed(() =>
  user.finished ? user.finished.includes("chapter4") : false
);
</script>
<style lang="less" scoped>
.user-chapter-4 {
}

.commentscontainer {
  text-align: left;
  padding: 1rem;
}

.options {
  button {
    display: block;
    width: 100%;
    // margin: 0 0 0.5em auto;
    color: var(--fg2);
    background: var(--bg);
    border-color: var(--bg2);
    &:hover {
      color: var(--fg);
    }
  }
}
button.active {
  background: var(--gbg);
  color: var(--gfg);
}
</style>
