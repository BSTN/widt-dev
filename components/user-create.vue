<template>
  <div class="user-start" v-if="!user.loading">
    <div class="centered" v-if="user.userid && user.userid !== ''">
      <div>
        <userAvatar :user="user.user" class="mainuser"></userAvatar>
        <br /><br />
        <div>Even wachten tot iedereen zover is...</div>
      </div>
    </div>
    <div class="" v-if="!user.userid">
      <div class="avatar">
        <div class="icon" v-html="icon" @click="generate()"></div>
        <div class="naam">{{ naam }}</div>
      </div>
      <div>
        <button @click="user.createUser({ name: naam, userid })">start</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { v4 as uuid } from "uuid";
import { nameByRace } from "fantasy-name-generator";
const user = useUserStore();
const naam = ref("");
const nameinput = ref(null);
const userid = ref("");
function generate() {
  naam.value = nameByRace("elf", {
    gender: Math.round(Math.random()) ? "male" : "female",
  });
  userid.value = uuid();
}
const icon = computed(() => {
  return user.tempIcon(userid.value);
});
watch(
  () => user.userid,
  () => {
    naam.value = "";
    generate();
  }
);

onMounted(() => {
  if (nameinput.value) {
    nameinput.value.focus();
  }
  generate();
});
</script>
<style lang="less" scoped>
.user-start {
  padding: 1em;
  text-align: center;
  width: 16rem;
  max-width: 100%;
  margin: 0 auto;
  user-select: none;
  :deep(.mainuser.user-avatar .icon) {
    animation: heartbeat 0.8s linear 0.5s infinite forwards;
    // animation: rotate 2s linear 0.5s infinite forwards;
    @keyframes heartbeat {
      0% {
        transform: scale(1);
      }
      40% {
        transform: scale(1.05);
      }
      70% {
        transform: scale(1);
      }
    }
    @keyframes rotate {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
}

.avatar {
  background: var(--bg);
  border-radius: 0.5em;
  margin-bottom: 1em;
  padding: 2em;
  .naam {
    font-size: 1.75em;
  }
}

.max {
  color: #f00;
}
</style>
