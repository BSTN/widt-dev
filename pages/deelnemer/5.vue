<template>
  <div class="user-chapter-5">
    <div class="questions">
      <div class="q" v-for="q in questions.chapter5">
        <div class="commentbox">{{ q.text }}</div>
        <botSlider v-model:value="value"></botSlider>
        value: {{ value }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import questions from "@/content/questions.yml";
const user = useUserStore();
const value = 0;
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
