<template>
  <div class="user-chapter-4">
    <div class="questions" v-if="finished">
      <div class="question">
        Welk label bij de volgende reacties vind je het beste van toepassing?
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
