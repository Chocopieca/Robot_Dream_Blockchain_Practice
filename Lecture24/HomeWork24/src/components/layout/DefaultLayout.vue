<template>
  <div id="particles"></div>
  <div class="wrapper font-family-poppins">
    <AppHeader />
    <main class="bh-main">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { tsParticles } from "tsparticles";
import particlesjsConfig from "@/assets/json/particlesjs-config.json";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    AppHeader: defineAsyncComponent(
      () => import("@/components/common/AppHeader.vue")
    ),
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    tsParticles.load("particles", particlesjsConfig)
  }
});
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  border: 0;
  height: 100%;
}
main {
  height: calc(100% - 52px);
}
html body #particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-dark-aubergine);
  z-index: -1;
}
</style>
