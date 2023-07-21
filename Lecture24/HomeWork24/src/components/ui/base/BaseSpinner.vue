<template>
  <div class="base-spinner-big">
    <div class="spinner-icon-container row justify-space-between">
      <div class="spinner-dot mr-2 mb-2"></div>
      <div class="spinner-dot mb-2"></div>
      <div class="spinner-dot mr-2"></div>
      <div class="spinner-dot"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseSpinner",
  props: {
    color: {
      type: String,
      default: "#000000"
    }
  },
  computed: {
    getColor() {
      return this.color;
    }
  }
});
</script>

<style scoped lang="scss">
.base-spinner-big {
  min-height: 45px;
  display: flex;
  height: 100%;
  .spinner-icon-container {
    width: 45px;
    height: 45px;
    margin: auto;
    animation: bysy-spinner 3.5s infinite linear;
    .spinner-dot {
      width: 15px;
      height: 15px;
      background-color: v-bind(getColor);
      border-radius: 50%;
    }
  }
}
@keyframes bysy-spinner {
  0% {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  100% {
    transform: rotateZ(720deg) translate3d(0, 0, 0);
  }
}
</style>
