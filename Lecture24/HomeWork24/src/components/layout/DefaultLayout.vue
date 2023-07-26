<template>
  <ParticlesComponent />
  <div class="wrapper font-family-poppins">
    <AppHeader />
    <main>
      <Transition mode="out-in">
        <ConnectMetamask v-if="!Signer" />
        <slot v-else />
      </Transition>
    </main>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { useEtherJsStore } from "@/stores/useEtherJs";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    AppHeader: defineAsyncComponent(
      () => import("@/components/common/AppHeader.vue")
    ),
    ConnectMetamask: defineAsyncComponent(
      () => import("@/components/common/ConnectMetamask.vue")
    ),
    ParticlesComponent: defineAsyncComponent(
      () => import("@/components/common/ParticlesComponent.vue")
    ),
  },
  computed: {
    Signer() {
      return useEtherJsStore().signer;
    }
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
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
