<template>
  <div class="creategroup">
    <div class="centered">
      <button>continue or start new</button>
      <ClientOnly>
        <div class="imgcontainer">
          <img :src="qrcodeimg" v-if="qrcodeimg !== ''" /><br />
        </div>
        <div class="row">
          <button class="copy">Kopiëer link</button><br /><br />
        </div>
        <nuxt-link :to="url">open user in tab</nuxt-link>
      </ClientOnly>
      <button @click="group.test()">test</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import QRCode from "qrcode";
const qrcodeimg = ref("");
const group = useGroupStore();
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
  text-align: center;
}
.imgcontainer {
  background: #fff;
  border-radius: 100%;
  width: 20rem;
  height: 20rem;
  margin: 0 auto 1rem;
  border: 2rem solid #fff;
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
</style>
