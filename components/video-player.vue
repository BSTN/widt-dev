<template>
  <div class="video" :class="{ started }">
    <div class="videoframe">
      <button
        @click="
          stop();
          $emit('next');
        "
      >
        <icon icon="cross" alt="close"></icon>
      </button>
      <video noloop ref="video">
        <source :src="file" type="video/mp4" />
      </video>
    </div>
    <div @click="$emit('restart')" class="restart"></div>
    <div class="control" :class="{ show: showController }" @mouseenter="enter">
      <div class="timeline">
        <Slider
          class="theslider"
          v-model="val"
          :min="0"
          :max="1"
          :step="0.001"
          :tooltips="false"
          tooltipPosition="top"
          :lazy="false"
          @start="startDragging()"
          @change="whileDragging()"
          @end="stopDragging()"
        ></Slider>
      </div>
      <div class="subcontrol">
        <div class="start" @click="startPlay()">Begin opnieuw</div>
        <div class="timecode">
          <span>{{ timecode }}</span>
          <span>{{ duration }}</span>
        </div>
      </div>
      <!-- <button @click="startPlay()" class="contrast">
        <icon icon="rewind"></icon>
      </button> -->
      <button @click="togglePlay()" class="contrast">
        <icon :icon="playing ? 'pause' : 'play'"></icon>
      </button>
      <!-- <button @click="toggleMute()" class="contrast">
        <icon :icon="muted ? 'muted' : 'unmuted'"></icon>
      </button> -->
      <!-- <button @click="$emit('next')">volgende</button> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import Slider from "@vueform/slider";
// for loading
const started = ref(true);

const group = useGroupStore();
const { file, initStarted } = defineProps({
  file: { type: String, default: () => "videos/test.mp4" },
  initStarted: { type: Boolean, default: () => true },
});
const val = ref(0);
const emit = defineEmits(["next", "restart"]);
const video = ref(null);
const playing = ref(false);
const muted = ref(true);
const showController = ref(true);
const timecode = ref("0:00");
const duration = ref("0:00");
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

function stop() {
  if (video.value) {
    video.value.pause();
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
onBeforeMount(() => {
  if (initStarted === false) {
    started.value = false;
  }
});
onMounted(() => {
  if (video.value) {
    video.value.addEventListener("play", () => {
      playing.value = true;
    });
    video.value.addEventListener("pause", () => {
      playing.value = false;
    });
    video.value.addEventListener("timeupdate", () => {
      timecode.value = fancyTimeFormat(parseInt(video.value.currentTime));
      duration.value = fancyTimeFormat(video.value.duration);
      // val.value = video.value.currentTime / video.value.duration;
    });
    video.value.addEventListener("ended", () => {
      emit("next");
    });
    video.value.addEventListener("volumechange", () => {
      muted.value = video.value.muted;
    });
    duration.value = fancyTimeFormat(video.value.duration);
    if (!video.value.paused) {
      playing.value = true;
    }
  }
  if (process.client && window) {
    window.addEventListener("mousemove", showControl);
  }
  showControl();

  window.requestAnimationFrame(refreshFrame);
  setTimeout(() => {
    started.value = false;
  }, 10);
});

let donotupdate = false;

function refreshFrame() {
  if (video.value && !donotupdate) {
    val.value = video.value.currentTime / video.value.duration;
  }
  window.requestAnimationFrame(refreshFrame);
}

function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;

  return ret;
}

function setTime() {
  if (video.value) {
    video.value.currentTime = val.value * video.value.duration;
  }
}

function whileDragging() {
  setTime();
}

function startDragging() {
  donotupdate = true;
  if (video.value) {
    // video.value.pause();
    setTime();
  }
}

function stopDragging() {
  donotupdate = false;
  if (video.value) {
    setTime();
    // video.value.play();
  }
}
</script>
<style lang="less" scoped>
@import "~/less/ease.less";
.restart {
  display: none;
}
.video {
  padding: 4rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  transition: all 0.5s;
  background: var(--bg);
  border-radius: 0.25rem;
  z-index: 9;
  .videoframe {
    position: relative;
    width: 60rem;
    max-width: 100%;
    // height: auto;
    margin: 0 auto;
    button {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      border: 0;
      background: transparent;
      padding: 0.5rem;
      font-size: 1.5rem;
      margin: 0.25em;
      // color: var(--bg);
      color: var(--fg);
      border-radius: 100%;
      // background: var(--fg);
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }
  video {
    background: #222;
    position: relative;
    border-radius: 1rem;
    width: 100%;
  }
  &.started {
    width: 8rem;
    min-height: auto;
    padding: 0.25rem;
    margin: 0.5rem;
    .restart {
      position: absolute;
      top: 0;
      left: 0;
      // background: #000;
      opacity: 0.1;
      cursor: pointer;
      width: 100%;
      height: 100%;
      z-index: 9999;
      display: block;
    }
    .videoframe {
      button {
        display: none;
      }
    }
    video {
      border-radius: 0.25rem;
    }
    .control {
      display: none;
    }
  }
}

.timecode {
  span {
    margin-left: 0.5em;
    &:first-child {
      opacity: 0.5;
    }
  }
}

.control {
  text-align: center;
  .start {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  button {
    background: var(--fg);
    color: var(--bg);
    font-size: 2em;
    opacity: 0.8;
    &:hover {
      background: var(--fg);
      opacity: 1;
    }
  }
  &.show {
    opacity: 1;
  }
}

.timeline {
  width: 60rem;
  max-width: 100%;
  margin: 1rem auto 0;
  --slider-bg: var(--bg2);
  --slider-connect-bg: var(--fg);
  --slider-handle-bg: var(--fg);
  --slider-handle-shadow: none;
}

.subcontrol {
  display: flex;
  width: 60rem;
  max-width: 100%;
  margin: 0 auto;
  text-align: left;
  padding: 0.5em 0;
  font-size: 0.75rem;
  > div:nth-child(1) {
    flex: 1;
  }
}
</style>
