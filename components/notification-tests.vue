<template>
  <div class="notification-tests">
    <button @click="message('hello')">message notify</button>
    <button @click="error('Oeps, er gaat iets mis.')">error notify</button>
    <button @click="alert('This is an alert!', 'Alternatieve text')">
      alert
    </button>
    <button @click="check()">confirm</button>
    <button @click="kies()">choose</button>
  </div>
</template>
<script lang="ts" setup>
const { message, alert, confirm, choose, error } = useNotify();

async function kies() {
  const choice = await choose("What do you want?", {
    choices: ["A", "B", "C"],
  });
  if (choice) {
    alert(choice);
  }
}
async function check() {
  const sure = await confirm("Are you sure?");
  if (sure) {
    console.log("SURE");
  } else {
    console.log("NOT SO SURE...");
  }
}
</script>
<style lang="less" scoped>
.notification-tests {
}
</style>
