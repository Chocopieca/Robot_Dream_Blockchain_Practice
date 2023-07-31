<template>
  <Transition mode="out-in">
    <BaseLoading v-if="isLoading" />
    <BaseButton
      v-else
      buttonColor="#E95420"
      class="connect-button"
      @click="onConnectMetamask"
    >
      Connect Metamask
    </BaseButton>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import {useEtherJsStore} from "@/stores/useEtherJs";

export default defineComponent({
  name: "ConnectMetamask",
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    async onConnectMetamask() {
      this.isLoading = true;
      await useEtherJsStore().onConnect();
      this.isLoading = false;
    }
  }
})
</script>

<style scoped>
.connect-button {
  max-width: 280px;
  width: 100%;
}
</style>
