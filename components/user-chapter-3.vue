<template>
  <div class="user-chapter-3">
    <div class="question">
      Welk label bij de volgende reacties vind je het beste van toepassing?
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
import { storeToRefs } from "pinia";
const user = useUserStore();
import questions from "@/content/questions.yml";
const { getAnswer } = storeToRefs(user);
</script>
<style lang="less" scoped>
.user-chapter-3 {
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
    &:hover {
      color: var(--bg);
    }
  }
}
button.active {
  background: var(--fg);
  color: var(--bg);
}
</style>
