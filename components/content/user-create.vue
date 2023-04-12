<template>
  <div class="user-start">
    <div class="centered" v-if="user.userid">
      <div class="icon" v-html="user.icon"></div>
      <div>{{ user.name }}</div>
      <div>
        Als het goed is zie je nu je avatar verschijnen op het grote scherm.
      </div>
    </div>
    <div class="centered" v-if="!user.userid">
      <!-- <button @click="user.test">test</button> -->
      {{ user.userid }}
      <div class="icon" v-html="icon" @click="generate()"></div>
      <input
        type="text"
        v-model="naam"
        maxlength="20"
        ref="nameinput"
        placeholder="Verzin een naam"
        @keydown.enter="user.start({ name: naam, userid })"
      />
      <div v-if="naam.length > 20" class="max">
        Je naam kan maximaal 20 karakters bevatten.
      </div>
      <div>
        <button @click="user.start({ name: naam, userid })" class="contrast">
          start
        </button>
      </div>
      <!-- klik op de afbeelding om een ander icoontje te genereren. -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { v4 as uuid } from "uuid";
const user = useUserStore();
const naam = ref("");
const nameinput = ref(null);
const userid = ref("");
function generate() {
  userid.value = uuid();
}
const icon = computed(() => {
  return user.tempIcon(userid.value);
});
// TODO: check if user already exists!

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
}
.icon {
  background: var(--bg2);
  border-radius: 100%;
  width: 8rem;
  height: 8rem;
  position: relative;
  display: inline-block;
  margin: 0 auto 2rem;
}
input {
  background: var(--bg2);
  margin-bottom: 2em;
}
.max {
  color: #f00;
}
</style>
