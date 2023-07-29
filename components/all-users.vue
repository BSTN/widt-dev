<template>
  <div class="all-users" :class="'type-' + type">
    <div v-if="users">
      <label
        >{{ users.length }} deelnemer{{
          users.length > 1 || users.length === 0 ? "s" : ""
        }}</label
      >
      <userAvatar v-for="user in users" :user="user" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
const group = useGroupStore();
const user = useUserStore();
const users = ref([]);
const { users: groupUsers } = storeToRefs(group);
const { users: userUsers } = storeToRefs(user);

function setUsers() {
  users.value =
    groupUsers.value.length > userUsers.value.length
      ? groupUsers.value
      : userUsers.value;
}
watch(
  groupUsers,
  () => {
    setUsers();
  },
  {
    deep: true,
  }
);
watch(
  userUsers,
  () => {
    setUsers();
  },
  {
    deep: true,
  }
);
const { type } = defineProps({
  type: {
    type: [String, Boolean],
    default: () => "default",
  },
});
onMounted(() => {
  setUsers();
});
</script>
<style lang="less" scoped>
.all-users {
  text-align: center;
  // border-top: 1px solid var(--bc);
  max-width: 120vh;
  margin: 2rem auto;
  padding: 1rem 0;
  :deep(.user-avatar) {
    font-size: 0.8rem;
  }
  &.type-small {
    :deep(.user-avatar) {
      font-size: 0.5rem;
      border-radius: 4rem;
      width: 4rem;
      height: 4rem;
      .icon {
        margin: 0 auto;
      }
      .name {
        padding: 1em 0;
      }
      // .name {
      //   display: none;
      // }
    }
  }
}
</style>
