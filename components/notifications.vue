<template>
  <div class="notifications">
    <!-- alerts -->
    <div class="alerts" v-if="alerts.length > 0">
      <div v-for="alert in alerts" class="alert">
        <div class="bg" @click="removeAlert(alert.id)"></div>
        <div class="frame" @click.stop>
          <div class="text">{{ alert.text }}</div>
          <div class="buttons">
            <button @click="removeAlert(alert.id)" class="contrast">
              {{ alert.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- confirmations -->
    <div class="confirms" v-if="confirms.length > 0">
      <div v-for="confirm in confirms" class="confirm">
        <div class="bg"></div>
        <div class="frame" @click.stop>
          <div class="text">{{ confirm.text }}</div>
          <div class="buttons">
            <button @click="confirm.resolve()">Ok</button>
            <button @click="confirm.reject()">Annuleer</button>
          </div>
        </div>
      </div>
    </div>
    <!-- choices -->
    <div class="choices" v-if="choices.length > 0">
      <div v-for="choice in choices" class="choice">
        <div class="bg"></div>
        <div class="frame" @click.stop>
          <div class="text">{{ choice.text }}</div>
          <div class="buttons">
            <button
              v-for="c in choice.buttons"
              :key="c + 'choice'"
              @click="choice.resolve(c)"
            >
              {{ c }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- messages -->
    <TransitionGroup tag="div" name="list" class="messages">
      <div
        v-for="m in messages"
        class="message"
        :class="m.type"
        @click="removeMessage(m.id)"
        :key="'message' + m.id"
      >
        <div v-html="m.text"></div>
      </div>
    </TransitionGroup>
  </div>
</template>
<script lang="ts" setup>
const { messages, removeMessage, alerts, removeAlert, confirms, choices } =
  useNotify();
</script>
<style lang="less">
@import "~/less/animations.less";
.alerts,
.confirms,
.choices {
  position: fixed;
  z-index: 999;
  .alert,
  .confirm,
  .choice {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: center;
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: var(--bgoverlay);
      .overlaybg();
      z-index: 1;
    }
    .frame {
      margin: 10vh auto;
      background: var(--bg);
      border-radius: 0.5em;
      padding: 2em 3em 1.5em;
      width: auto;
      display: inline-block;
      text-align: center;
      max-width: 26em;
      position: relative;
      z-index: 2;
      box-shadow: 0 0.5em 0.5em var(--bgoverlay);
      user-select: none;
      .popup();
      .text {
        padding-bottom: 0.5em;
        line-height: 1.4em;
      }
      .buttons {
        padding: 1em 0 0 0;
        button {
          min-width: 4em;
        }
      }
    }
  }
}
.messages {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 20rem;
  max-height: 100vh;
  z-index: 999;
  padding: 1em;
  font-size: 0.8rem;
  overflow: auto;
  text-align: left;
  .message {
    border: 1px solid #00f;
    border-radius: 0.5em;
    padding: 1em;
    background: var(--messagebg);
    color: var(--messagefg);
    border: 1px solid var(--messagefg);
    margin-bottom: 0.25em;
    line-height: 1.4em;
    &.error {
      border-color: var(--errorfg);
      color: var(--errorfg);
      background: var(--errorbg);
    }
  }
}
</style>
