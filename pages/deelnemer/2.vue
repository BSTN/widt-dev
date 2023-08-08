<template>
  <div class="user-chapter-2">
    <userPause v-if="!started || finished"></userPause>
    <div class="questions" v-if="started && !finished">
      <div class="item" v-for="(q, k) in questions.chapter2">
        <div class="name"><icon icon="user"></icon>{{ q.name }}</div>
        <div class="comments">
          <div class="comment commentbox" v-for="comment in q.comments">
            {{ comment }}
          </div>
        </div>
        <div class="answer">
          <button
            @click="user.setAnswer({ chapter: 'chapter2', k, answer: true })"
            :class="{
              active: getAnswer({ chapter: 'chapter2', k }) === true,
            }"
          >
            Trol
          </button>
          <button
            @click="user.setAnswer({ chapter: 'chapter2', k, answer: false })"
            :class="{
              active: getAnswer({ chapter: 'chapter2', k }) === false,
            }"
          >
            Geen Trol
          </button>
        </div>
      </div>
      <div class="done" v-if="!finished">
        <button class="contrast" @click="user.finish('chapter2')">
          Klik hier als je klaar bent!
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import questions from "@/content/questions.yml";
import { storeToRefs } from "pinia";
const user = useUserStore();
const { getAnswer } = storeToRefs(user);
const started = computed(() =>
  user.started ? user.started.includes("chapter2") : false
);
const finished = computed(() =>
  user.finished ? user.finished.includes("chapter2") : false
);
</script>
<style lang="less" scoped>
.user-chapter-2 {
  text-align: left;
  background: var(--testbg);
}
.questions {
  max-width: 30rem;
  margin: 0 auto;
}
.item {
  padding: 1em;
  .name {
    text-align: left;
    margin-bottom: 0.5em;
    padding: 1em 0;
    .icon {
      display: inline-block;
      margin-right: 0.5em;
      background: var(--bg);
      width: 4rem;
      height: 4rem;
      border: 1rem solid var(--bg);
      border-radius: 100%;
      vertical-align: middle;
      margin-right: 1em;
    }
  }
}
button.active {
  background: var(--fg);
  color: var(--bg);
}
</style>
