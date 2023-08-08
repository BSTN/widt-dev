<template>
  <div class="chapter-progress">
    <div class="users">
      <div class="user" v-for="user in group.users">
        <UserAvatar class="small" :user="user"></UserAvatar>
        <div class="name">{{ user.name }}</div>
        <div
          class="progress"
          v-if="chapter !== 'chapter4' && chapter !== 'chapter6'"
        >
          {{
            user.answers && user.answers[chapter]
              ? user.answers[chapter].length
              : 0
          }}
          / {{ questions[chapter].length }}
        </div>
        <div class="checked">
          <icon icon="done" v-if="done(user)"></icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
import questions from "@/content/questions.yml";
const { chapter } = defineProps({
  chapter: {
    type: String,
    default: () => "",
  },
});
function done(user) {
  if (chapter === "chapter4") {
    return user.answers && user.answers[chapter] && user.answers[chapter][0];
  }
  return (
    user.answers &&
    user.answers[chapter] &&
    user.answers[chapter].length === questions[chapter].length
  );
}
</script>
<style lang="less" scoped>
.chapter-progress {
  margin-bottom: 2rem;
}
.users {
  width: 20rem;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 0.25em;
  background: var(--bg);
  padding: 1rem;
  .user {
    display: flex;
    background: var(--bg);
    border-radius: 0.25em;
    margin-bottom: 2px;
    align-items: center;
    .name {
      flex: 1;
      text-align: left;
      padding: 0 0.5em;
    }
    .progress {
      padding: 0 0 0 0.5em;
    }
    .checked {
      padding: 0 0.5em;
      :deep(.icon) {
        background: transparent;
      }
    }
  }
}
</style>
