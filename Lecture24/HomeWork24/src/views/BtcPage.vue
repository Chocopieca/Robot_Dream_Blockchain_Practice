<template>
  <div class="h-100 flex-center">
    <ConnectBtcWallet v-if="!isConnected" />
    <BaseCard v-else width="500" bgColor="#ffffff">
      <h1 class="ma-0">Btc</h1>
      <div>Balance: {{ userBtcBalance }} BTC</div>
      <BaseDivider class="my-2" color="#000000"/>
      <div>Address:</div>
      <a
        :href="getAddressLink"
        class="address main-black-text"
      >
        {{ userAddress }}
      </a>
      <BaseDivider class="my-2" color="#000000"/>
      <SendBtcForm />
    </BaseCard>
  </div>
</template>

<script>
import {computed, defineAsyncComponent} from "vue";
import {useBtcStore} from "@/stores/useBtcStore";

export default {
  name: "EtherPage",
  components: {
    ConnectBtcWallet: defineAsyncComponent(
        () => import("@/components/common/ConnectBtcWallet.vue")
    ),
    SendBtcForm: defineAsyncComponent(
        () => import("@/components/module/btcPage/SendBtcForm.vue")
    ),
  },
  setup() {
    const useBtc = useBtcStore();
    const userAddress = computed(() => useBtc.btcAddress);
    const userBtcBalance = computed(() => useBtc.btcBalance);
    const isConnected = computed(() => useBtc.isConnected);

    return {useBtc, userAddress, userBtcBalance, isConnected};
  },
  computed: {
    getAddress() {
      return this.userAddress ? `${this.userAddress.slice(0, 10)}...${this.userAddress.slice(-10)}` : "---"
    },
    getAddressLink() {
      return `https://live.blockcypher.com/btc-testnet/address/${this.userAddress}/`
    }
  }
}
</script>

<style scoped>
.address {
  max-width: 400px;
  width: 100%;
  overflow: hidden;
}
</style>
