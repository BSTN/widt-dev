<template>
  <div class="video">
    <video autoplay noloop @click="toggleMute()" ref="video">
      <source :src="file" type="video/mp4" />
    </video>
    <div class="control" :class="{ show: showController }" @mouseenter="enter">
      <button @click="startPlay()" class="contrast"><icon icon="rewind"></icon></button>
      <button @click="togglePlay()" class="contrast"><icon :icon="playing ? 'pause' : 'play'"></icon></button>
      <button @click="toggleMute()" class="contrast"><icon :icon="muted ? 'muted' : 'unmuted'"></icon></button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { file } = defineProps({
  file: { type: String, default: () => "video/test.mp4" },
});
const video = ref(null);
const playing = ref(true);
const muted = ref(true);
const showController = ref(true);
function toggleMute() {
  if (video.value) {
    video.value.muted = !video.value.muted;
  }
}
function togglePlay() {
  if (video.value) {
    if (video.value.paused == true) {
      video.value.play();
    } else {
      video.value.pause();
    }
  }
}
function startPlay() {
  if (video.value) {
    video.value.pause();
    video.value.currentTime = 0;
    video.value.play();
  }
}
let timer = false;
function showControl() {
  showController.value = true;
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    showController.value = false;
  }, 700);
}
onMounted(() => {
  if (video.value) {
    video.value.addEventListener("play", () => {
      playing.value = true;
    });
    video.value.addEventListener("pause", () => {
      playing.value = false;
    });
    video.value.addEventListener("volumechange", () => {
      muted.value = video.value.muted;
    });
    if (!video.value.paused) {
      playing.value = true;
    }
  }
  if (process.client && window) {
    window.addEventListener("mousemove", showControl);
  }
  showControl();
});
</script>
<style lang="less" scoped>
@import "~/less/ease.less";
.video {
  background: #0f0;
  video {
    background: #222;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .control {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    // height: 100%;
    z-index: 2;
    padding: 1rem 1rem 3rem;
    font-size: 0.8rem;
    background: linear-gradient(#00000000, #000000cc);
    opacity: 0;
    transition: all 0.5s @easeInOutExpo;
    text-align: center;
    button {
      background: #111;
      color: #fff;
      font-size: 2em;
      opacity: 0.8;
      &:hover {
        background: #111;
        opacity: 1;
      }
    }
    &.show {
      opacity: 1;
    }
  }
}
</style>
