<template>
  <div class="user-chapter-4">
    <div class="question">
      {{ questions.chapter4 }}
    </div>
    <div v-for="(q, k) in questions.chapter3" class="commentscontainer">
      <div class="commentbox">
        {{ q.text }}
      </div>
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
.user-chapter-4 {
}
.commentscontainer {
  text-align: left;
  padding: 1rem;
}
</style>
