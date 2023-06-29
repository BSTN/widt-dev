<template>
  <div class="user-chapter-5">
    <div class="question">Beat the bot!</div>
    <div class="input">
      <textarea v-model="input"></textarea>
    </div>
    <div class="buttons">
      <button @click="send()">verstuur</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const user = useUserStore();
const input = ref("");
async function send() {
  const data = await $fetch("/socketapi/beatthebot", {
    method: "POST",
    body: { text: input.value, userid: user.userid, groupid: user.groupid },
  });
  console.log(data);
}
</script>
<style lang="less" scoped>
.user-chapter-5 {
}
.input {
  padding: 1rem;
  textarea {
    min-height: 10em;
    box-shadow: inset 0 0.125rem 0.5rem #00000088;
    border: 1px solid var(--bg);
    &:focus {
      border: 1px solid var(--fg);
    }
  }
}
</style>
