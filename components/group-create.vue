<template>
  <div class="group-create">
    <div v-if="!group.loading">
      <ClientOnly>
        <div class="imgcontainer" @click="copy()">
          <img :src="qrcodeimg" v-if="qrcodeimg !== ''" /><br />
        </div>
        <!-- <div class="row">
          <button @click="copy()" class="copy contrast">Kopiëer</button>
          <button @click="email()" class="contrast">Email</button><br /><br />
        </div> -->
        <span style="display: none">{{ url }}</span>
      </ClientOnly>
    </div>
  </div>
</template>
<script lang="ts" setup>
import QRCode from "qrcode";
const qrcodeimg = ref("");
const group = useGroupStore();
const { message } = useNotify();
const mailLink = computed(() => {
  const subject = encodeURI("Doe mee met Wie is de trol?!");
  const body = encodeURI(`Klik op deze link om mee te doen:\n\n${url.value}`);
  return `mailto:?subject=${subject}&body=${body}`;
});
function email() {
  window.open(mailLink.value);
}
function copy() {
  message(
    `Link gekopieerd naar je clipboard, je kunt nu de link in een email of chat plakken om deelnemers uit te nodigen.<Br><br> ${url.value}`,
    { duration: 6000 }
  );
  // message(`${group.groupid}`);
  navigator.clipboard.writeText(url.value);
}
const url = computed(() => {
  const str = window.location.href;
  const url =
    (str.endsWith("/") ? str.slice(0, -1) : str) +
    "/deelnemer/start?id=" +
    group.groupid;
  QRCode.toDataURL(url, function (err, code) {
    if (err) return console.log("error occurred");
    qrcodeimg.value = code;
  });
  return url;
});
</script>
<style lang="less" scoped>
.group-create {
  text-align: center;
  font-size: 1rem;
}
.imgcontainer {
  background: #fff;
  border-radius: 100%;
  border-radius: 1rem;
  width: 20rem;
  height: 20rem;
  margin: 0 auto 0;
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
  mix-blend-mode: darken;
}
button {
  display: inline-block;
}
</style>
