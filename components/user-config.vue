<template>
  <div class="user-config" :class="status">
    <div class="topbar" @click="open = !open">
      <user-avatar :user="user"></user-avatar>
      <div class="flex">{{ user.name }}</div>
      <div class="burger">
        <icon icon="menu" v-if="!open"></icon>
        <icon icon="cross" v-if="open"></icon>
      </div>
    </div>
    <div class="menu" v-if="open && user.userid">
      <div class="order">
        <div
          class="position"
          v-for="(item, k) in order"
          :class="{ active: k === user.position }"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="status">status: {{ status }}</div>
      <button class="reset" @click="user.reset()" v-if="user.userid !== ''">
        verlaat het spel
      </button>
    </div>
    <div class="loggedoutmenu" v-if="open && !user.userid">
      Bezoek <a href="https://wie-is-de-trol.nl"> wie-is-de-trol.nl</a> voor
      meer informatie.
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/stores/userstore";
import order from "@/content/order.yml";
const user = useUserStore();
const status = ref("");
const route = useRoute();
const open = ref(false);
watch(
  () => user.connected,
  () => {
    status.value = user.connected ? "connected" : "disconnected";
  }
);
onMounted(() => {
  if (route.query.id) {
    user.setGroupid(route.query.id);
  }
  if (!user.mounted) {
    user.init();
  }
});
</script>
<style lang="less" scoped>
.user-config {
  padding: 0em;
  transition: all 0.15s;
  position: sticky;
  top: 0;
  user-select: none;
  // border-bottom: 1px solid var(--fg2);
  z-index: 9;
  border-bottom: 1px solid var(--bg2);
}
.topbar {
  // border-bottom: 1px solid var(--fg);
  display: flex;
  padding: 0 0.5em;
  text-align: left;
  background: var(--bg);
  cursor: pointer;
  align-items: center;
  > * {
    // outline: 1px solid #ccc;
    border-radius: 0;
  }
  > div {
    padding: 0.5em 0.25em;
  }
  > .burger {
    margin-right: 0.5rem;
  }
  .flex {
    flex: 1;
  }
}

.menu {
  // position: fixed;
  position: relative;
  z-index: 999;
  background: var(--bg);
}

.loggedoutmenu {
  position: relative;
  background: var(--bg);
  padding: 2rem;
}
.status {
  padding: 0em 0.5em;
  --fg: #222;
  color: var(--fg);
  border-radius: 0.25em;
  text-transform: uppercase;
  font-size: 0.6rem;
  border: 1px solid var(--fg);
  display: block;
  width: 12rem;
  margin: 0 auto 0em;
  .connected & {
    background: #a5de93;
  }
  .disconnected & {
    background: #d85434;
  }
}
.order {
  padding: 1em;
  text-align: left;
  > div {
    border-top: 1px solid var(--bg2);
    padding: 0.5em 0;
    color: var(--fg2);
    &:last-child {
      border-bottom: 1px solid var(--bg2);
    }
    &.active {
      color: var(--fg);
    }
  }
}
button.reset {
  background: #f00;
  color: var(--bg);
  padding: 0.25em 0.5em;
  border: 0;
  margin: 1rem;
  text-transform: uppercase;
  font-size: 0.8rem;
}
:deep(.user-avatar) {
  padding: 0;
  margin: 0;
  width: auto;
  background: transparent;
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
  }
  .name {
    display: none;
  }
}
</style>
