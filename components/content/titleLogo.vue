<template>
  <div class="title-logo" ref="titlelogo">
    <div class="frame">Wie is de trol?</div>
    <svg>
      <filter id="fuzz">
        <!-- <feMorphology operator="dilate" radius="2" result="start"></feMorphology> -->
        <!-- <feMorphology operator="erode" radius="1" result="start"></feMorphology> -->
        <feGaussianBlur
          stdDeviation="8"
          in="start"
          result="main"
        ></feGaussianBlur>
        <feGaussianBlur
          stdDeviation="10"
          in="start"
          result="blur"
        ></feGaussianBlur>
        <feComposite
          operator="arithmetic"
          in="main"
          in2="blur"
          k1="0"
          :k2="sharpen + 1"
          :k3="sharpen * -1"
          k4="0"
        ></feComposite>
        <!-- <feMorphology operator="dilate" radius="4" result="start"></feMorphology> -->

        <!-- recolor -->
        <feComponentTransfer color-interpolation-filters="sRGB">
          <!-- <feFuncR type="table" :tableValues="`${R2} 0.5 ${R1}`"></feFuncR>
          <feFuncG type="table" :tableValues="`${G2} 0.9 ${G1}`"></feFuncG>
          <feFuncB type="table" :tableValues="`${B2} 0.4 ${B1}`"></feFuncB> -->
          <feFuncR type="table" :tableValues="`${R2} 0.5 ${R1}`"></feFuncR>
          <feFuncG type="table" :tableValues="`${G2} 0.9 ${G1}`"></feFuncG>
          <feFuncB type="table" :tableValues="`${B2} 0.7 ${B1}`"></feFuncB>
        </feComponentTransfer>
      </filter>
    </svg>
  </div>
</template>
<script lang="ts" setup>
const sharpen = ref(20);
const titlelogo = ref(null);
const R1 = ref(0);
const R2 = ref(0);
const G1 = ref(0);
const G2 = ref(0);
const B1 = ref(0);
const B2 = ref(0);

function setColors() {
  if (titlelogo.value) {
    const bg = window
      .getComputedStyle(titlelogo.value, null)
      .getPropertyValue("background-color");
    const fg = window
      .getComputedStyle(titlelogo.value, null)
      .getPropertyValue("color");
    const [bgr, bgg, bgb] = bg
      .substring(bg.indexOf("(") + 1, bg.lastIndexOf(")"))
      .split(/,\s*/);
    const [fgr, fgg, fgb] = fg
      .substring(fg.indexOf("(") + 1, fg.lastIndexOf(")"))
      .split(/,\s*/);
    R1.value = parseInt(bgr) / 256;
    R2.value = parseInt(fgr) / 256;
    G1.value = parseInt(bgg) / 256;
    G2.value = parseInt(fgg) / 256;
    B1.value = parseInt(bgb) / 256;
    B2.value = parseInt(fgb) / 256;
  }
}

onUpdated(() => {
  setColors();
});

onMounted(() => {
  setColors();
});
</script>
<style lang="less" scoped>
.title-logo {
  margin: 0 auto;
  font-size: 5rem;
  text-align: center;
  background: var(--bg);
  color: var(--fg);

  font-family: "Barlow";
  font-weight: bold;
  text-transform: uppercase;

  letter-spacing: 0.1em;
  svg {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .frame {
    width: 5.5em;
    margin: 0 auto;
    display: block;
    box-sizing: content-box;
    padding: 0.25em;
    padding: 1em;
    font-family: fipps;
    line-height: 1.5em;
    color: #000;
    background: #fff;
    filter: url(#fuzz);
  }
}
</style>
