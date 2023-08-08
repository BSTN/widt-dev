<template>
  <div class="group-chapter-7" v-if="!group.loading">
    <div>.</div>
    <h1>Over en uit.</h1>
    <div class="text">
      <p>Bedankt voor met meedoen met <i>Wie is de trol?</i>!</p>
      <p>
        We hopen dat je nu beter inzicht hebt in de ontwikkeling die
        <i>online reageren</i> heeft doorgemaakt, welke rol AI daarin is gaan
        spelen en hoe dat ongeveer werkt. En wellicht heb je een beter idee over
        hoe het er in de toekomst wellicht uit gaat zien...
      </p>
      <p>
        Wil je meer lezen, Ga dan naar
        <a
          target="_blank"
          href="https://www.wie-is-de-trol.nl/achtergrond-informatie"
          >www.wie-is-de-trol.nl/achtergrond-informatie</a
        >.
      </p>
      <p>
        Wil je deze les aanraden aan vrienden en/of familie? Stuur de link
        <a target="_blank" href="https://www.wie-is-de-trol.nl"
          >www.wie-is-de-trol.nl</a
        >
        door!
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
const group = useGroupStore();
</script>
<style lang="less" scoped>
.group-7 {
}
.text {
  width: 34rem;
  max-width: calc(100% - 2rem);
  margin: 0 auto;
  p {
    margin-bottom: 1em;
  }
}
</style>
