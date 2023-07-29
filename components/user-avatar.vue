<template>
  <div class="user-avatar" v-if="user && user.userid && user.userid !== ''">
    <div class="icon" v-html="tempIcon(user.userid)"></div>
    <div class="name">{{ user.name }}</div>
  </div>
</template>
<script lang="ts" setup>
const { tempIcon } = useUserStore();
const { user } = defineProps({
  user: {
    type: [Object, Boolean],
    default: false,
  },
});
</script>
<style lang="less" scoped>
@import "@/less/ease.less";
.user-avatar {
  display: inline-block;
  padding: 1em;
  color: var(--fg2);
  width: 10em;
  background: var(--bg);
  margin: 0.5em;
  border-radius: 1em;
  transition: all 0.3s @easeInOutExpo;
  &:hover {
    transform: scale(1.05);
  }
}
.icon {
  background: var(--bg);
  border-radius: 0.5em;
  width: 6em;
  margin: 0 auto;
  padding: 0;
  :deep(svg) {
    margin: 0;
    padding: 0;
    display: block;
  }
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0.25em 0;
}
.user-avatar.small {
  width: 2rem;
  margin: 0;
  padding: 0;
  .icon {
    width: 2rem;
  }
  .name {
    display: none;
  }
}
</style>
