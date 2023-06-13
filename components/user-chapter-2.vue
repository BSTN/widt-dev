<template>
  <div class="user-chapter-2">
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
    <div class="done">
      {{ user.finished }}
      <button class="contrast" @click="user.finish('chapter2')">Klaar?</button>
      <button class="contrast" @click="user.unFinish('chapter2')">
        Niet klaar!
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import questions from "@/content/questions.yml";
import { storeToRefs } from "pinia";
const user = useUserStore();
const { getAnswer } = storeToRefs(user);
</script>
<style lang="less" scoped>
.user-chapter-2 {
  text-align: left;
}
.item {
  padding: 1em;
  border-bottom: 1px solid var(--fg);
  .name {
    text-align: center;
    margin-bottom: 0.5em;
    padding: 1em 0;
    .icon {
      display: inline-block;
      margin-right: 0.5em;
    }
  }
}
button.active {
  background: var(--fg);
  color: var(--bg);
}
</style>
