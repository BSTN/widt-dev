<template>
  <div class="video">
    <video autoplay noloop muted @click="toggleMute()" ref="video">
      <source :src="file" type="video/mp4" />
    </video>
    <div class="control">
      <button @click="startPlay()">speel opnieuw</button>
      <button @click="togglePlay()">play/pause {{ playing }}</button>
      <button @click="toggleMute()">mute {{ muted }}</button>
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
});
</script>
<style lang="less" scoped>
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
    top: 0;
    left: 0;
    width: 100%;
    // height: 100%;
    z-index: 2;
    padding: 1rem;
    font-size: 0.8rem;
    background: linear-gradient(#000000cc, #00000000);
  }
}
</style>
