<template>
  <div class="user-start">
    <div class="centered">
      <div class="icon" v-html="user.icon" @click="user.generate()"></div>
      <input
        type="text"
        v-model="naam"
        maxlength="20"
        placeholder="Verzin een naam"
      />
      <div v-if="naam.length > 20" class="max">
        Je naam kan maximaal 20 karakters bevatten.
      </div>
      <div>
        <button @click="user.start(naam)" class="contrast">ok</button>
      </div>
      <!-- klik op de afbeelding om een ander icoontje te genereren. -->
    </div>
  </div>
</template>
<script lang="ts" setup>
const user = useUserStore();
const naam = ref("");
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
