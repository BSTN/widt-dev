<template>
  <div class="user-chapter-4">
    <userPause v-if="!started || finished"></userPause>
    <div class="questions" v-if="!finished">
      <div class="question">
        Welke van de vorige berichten zou jij uitlichten? Je mag er 1 kiezen.
      </div>
      <div
        v-for="(q, k) in questions.chapter3"
        class="commentscontainer"
        @click="user.setAnswer({ chapter: 'chapter4', k: 0, answer: k })"
        :class="{ active: getAnswer({ chapter: 'chapter4', k: 0 }) === k }"
      >
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
  background: var(--testbg);
}

.commentscontainer {
  text-align: left;
  padding: 1rem;
  cursor: pointer;
  &.active {
    .commentbox {
      background: var(--gfg);
      color: var(--gbg);
      &:before {
        background: var(--gfg);
      }
    }
  }
}
</style>
