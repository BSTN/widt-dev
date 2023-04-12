<template>
  <div class="creategroup">
    <div v-if="!group.loading">
      <ClientOnly>
        <div class="imgcontainer">
          <img :src="qrcodeimg" v-if="qrcodeimg !== ''" /><br />
        </div>
        <div class="row">
          <button class="copy">Kopiëer</button>
          <button @click="email()">Email</button><br /><br />
        </div>
        <nuxt-link :to="url" target="_blank">open user in tab</nuxt-link>
        <br /><br />{{ group.groupid }}
      </ClientOnly>
    </div>
  </div>
</template>
<script lang="ts" setup>
import QRCode from "qrcode";
const qrcodeimg = ref("");
const group = useGroupStore();
const mailLink = computed(() => {
  const subject = encodeURI("Doe mee met Wie is de trol?!");
  const body = encodeURI(`Klik op deze link om mee te doen:\n\n${url.value}`);
  return `mailto:?subject=${subject}&body=${body}`;
});
const url = computed(() => {
  const url = window.location.href.replace(
    "/start",
    "/test?id=" + group.groupid
  );
  QRCode.toDataURL(url, function (err, code) {
    if (err) return console.log("error occurred");
    qrcodeimg.value = code;
  });
  return url;
});
</script>
<style lang="less" scoped>
.creategroup {
  text-align: left;
  font-size: 1rem;
}
.imgcontainer {
  background: #fff;
  border-radius: 100%;
  border-radius: 1rem;
  width: 20rem;
  height: 20rem;
  margin: 0 0 1rem;
  overflow: hidden;
  position: relative;
}
img {
  @m: 2rem;
  position: absolute;
  width: calc(100% - @m);
  height: calc(100% - @m);
  left: @m * 0.5;
  top: @m * 0.5;
}
button {
  display: inline-block;
}
</style>
