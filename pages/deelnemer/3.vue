<template>
  <div class="user-chapter-3">
    <userPause v-if="!started || finished"></userPause>
    <div class="questions" v-if="!finished">
      <div class="question">
        Welk label vind je het beste van toepassing bij de volgende reacties?
      </div>
      <div v-for="(q, k) in questions.chapter3" class="commentscontainer">
        <div class="commentbox">
          {{ q.text }}
        </div>
        <div class="options">
          <button
            v-for="label in questions['chapter3-labels']"
            @click="user.setAnswer({ chapter: 'chapter3', k, answer: label })"
            :class="{
              active: getAnswer({ chapter: 'chapter3', k }) === label,
            }"
          >
            {{ label }}
          </button>
        </div>
      </div>
    </div>
    <div class="done" v-if="!finished">
      <button class="contrast" @click="user.finish('chapter3')">
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
  user.started ? user.started.includes("chapter3") : false
);
const finished = computed(() =>
  user.finished ? user.finished.includes("chapter3") : false
);
</script>
<style lang="less" scoped>
.user-chapter-3 {
}

.questions {
  max-width: 100%;
  width: 40rem;
  margin: 0 auto;
}

.commentscontainer {
  text-align: left;
  padding: 1rem;
}

.options {
  text-align: right;
  font-size: 0.8rem;
  button {
    display: inline-block;
    // width: 100%;
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
  border-color: var(--gbg);
  &:hover {
    color: var(--bg);
  }
}
</style>
