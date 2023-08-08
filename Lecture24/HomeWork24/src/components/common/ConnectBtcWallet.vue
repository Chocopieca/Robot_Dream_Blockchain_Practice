<template>
  <Transition mode="out-in">
    <BaseLoading v-if="isLoading" />
    <BaseButton
      v-else
      buttonColor="#E95420"
      class="connect-button"
      @click="onConnectBtcWallet"
    >
      Connect your btc wallet
    </BaseButton>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import {useBtcStore} from "@/stores/useBtcStore";

export default defineComponent({
  name: "ConnectBtcWallet",
  data() {
    return {
      isLoading: false,
    }
  },
  setup() {
    const useBtc = useBtcStore();

    async function initBtcWallet() {
      return await useBtc.initBtcWallet();
    }
    return {
      initBtcWallet
    }
  },
  methods: {
    async onConnectBtcWallet() {
      this.isLoading = true;
      await this.initBtcWallet();
      this.isLoading = false;
    },
  }
})
</script>

<style scoped>
.connect-button {
  width: 100%;
}
</style>
