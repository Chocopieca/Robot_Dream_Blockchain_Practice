<template>
  <div>
    <Transition mode="out-in">
      <ConnectBtcWallet v-if="connectType === 'withPrivateKey'" class="mb-5" />
      <GenerateBtcAddress v-else-if="connectType === 'generateAddress'" class="mb-5" />
    </Transition>
    <span class="size16-weight700 main-orange-text cursor-pointer">
      <Transition mode="out-in">
        <span
            v-if="connectType === 'withPrivateKey'"
            @click="connectType = 'generateAddress'"
        >Create address</span>
        <span
            v-else-if="connectType === 'generateAddress'"
            @click="connectType = 'withPrivateKey'"
        >I have private key</span>
      </Transition>
    </span>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "ConnectBtcMenu",
  components: {
    ConnectBtcWallet: defineAsyncComponent(
        () => import("@/components/common/ConnectBtcWallet.vue")
    ),
    GenerateBtcAddress: defineAsyncComponent(
        () => import("@/components/module/btcPage/GenerateBtcAddress.vue")
    ),
  },
  data() {
    return {
      connectType: "withPrivateKey",
    }
  }
}
</script>

<style scoped>

</style>
