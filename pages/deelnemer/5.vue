<template>
  <div class="user-chapter-5">
    <div class="questions">
      <div class="q" v-for="(q, k) in questions.chapter5">
        <div class="commentbox">{{ q.text }}</div>
        <botSlider
          :data="getAnswer({ chapter: 'chapter5', k }) || 0"
          :number="k"
          @change="update"
        ></botSlider>
        value[{{ k }}]: {{ getAnswer({ chapter: "chapter5", k }) }}
      </div>
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
  console.log(k);
  user.setAnswer({ chapter: "chapter5", k, answer: data });
}
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
