<template>
  <div class="finished">
    <button>refresh</button>
    <div class="user" v-for="user in group.users">
      <UserAvatar :user="user"></UserAvatar>
      <div class="name">{{ user.name }}</div>
      <div class="finished">
        {{
          group.finished[name]
            ? group.finished[name].includes(user.userid)
            : false
        }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
const { name } = defineProps({
  name: {
    type: String,
    default: () => "",
  },
});
</script>
<style lang="less" scoped>
.finished {
}
</style>
