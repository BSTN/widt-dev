<template>
  <div class="all-users">
    <div class="user" v-for="user in users">
      <div class="icon" v-html="tempIcon(user.userid)"></div>
      <div class="name">{{ user.name }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { users } = useGroupStore();
const { tempIcon } = useUserStore();
</script>
<style lang="less" scoped>
.all-users {
  text-align: center;
  border-top: 1px solid var(--bc);
  max-width: 120vh;
  margin: 2rem auto;
  padding: 1rem 0;
}

.icon {
  background: var(--bg2);
  border-radius: 100%;
}

.user {
  display: inline-block;
  width: 4rem;
}
</style>
