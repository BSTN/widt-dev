<template>
  <div class="user-chapter1" v-if="!user.loading">
    <userPause v-if="!started || finished"></userPause>
    <div v-if="started && !finished" class="comments">
      <div
        v-for="(comment, k) in questions.chapter1"
        class="comment"
        :class="{ active: k <= getChapterPosition('chapter1') }"
      >
        <div class="text">{{ comment }}</div>
        <div class="buttons">
          <button
            @click="user.setAnswer({ chapter: 'chapter1', k, answer: true })"
            :class="{
              active: getAnswer({ chapter: 'chapter1', k }) === true,
            }"
          >
            Toestaan
          </button>
          <button
            @click="user.setAnswer({ chapter: 'chapter1', k, answer: false })"
            :class="{
              active: getAnswer({ chapter: 'chapter1', k }) === false,
            }"
          >
            Verwijderen
          </button>
        </div>
      </div>
    </div>
    <div class="done" v-if="!finished">
      <button class="contrast" @click="user.finish('chapter1')">
        Klik hier als je klaar bent!
      </button>
      <!-- <button class="contrast" @click="user.unFinish('chapter1')">
      Niet klaar!
    </button> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import questions from "@/content/questions.yml";
const user = useUserStore();

const { getAnswer, getChapterPosition } = storeToRefs(user);

const started = computed(() =>
  user.started ? user.started.includes("chapter1") : false
);
const finished = computed(() =>
  user.finished ? user.finished.includes("chapter1") : false
);
</script>
<style lang="less" scoped>
.user-chapter1 {
  text-align: left;
  background: var(--testbg);
}
.comments {
  padding: 1rem;
}
.comment {
  margin: 0 auto 2rem;
  width: 32rem;
  max-width: 100%;
  opacity: 0.1;
  pointer-events: none;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
  .text {
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0 0.25em 0.25em 0.25em;
    background: var(--cbg);
    color: var(--cfg);
    position: relative;
    &:before {
      content: "";
      position: absolute;
      left: -0.5rem;
      top: 0rem;
      width: 0.5rem;
      height: 0.5rem;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 0%);
      background: var(--cbg);
    }
  }
  .buttons {
    text-align: right;
    button {
      border: 0;
    }
    button.active {
      &:first-child {
        background: var(--gbg);
        color: var(--gfg);
        border-color: var(--gbg);
      }
      &:nth-child(2) {
        background: var(--rbg);
        color: var(--rfg);
        border-color: var(--rbg);
      }
    }
  }
}
</style>
