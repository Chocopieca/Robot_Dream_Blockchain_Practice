<template>
  <Transition mode="out-in">
    <ConnectBtcMenu v-if="!isConnected"/>
    <BaseCard v-else width="500" bgColor="#ffffff">
      <h1 class="ma-0 main-bright-red-text">Btc</h1>
      <div>
        Balance:
        <span class="size20-weight700 main-red-text">
          {{ userBtcBalance }} BTC
        </span>
      </div>
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
  </Transition>
</template>

<script>
import {computed, defineAsyncComponent} from "vue";
import {useBtcStore} from "@/stores/useBtcStore";

export default {
  name: "BtcCard",
  components: {
    SendBtcForm: defineAsyncComponent(
        () => import("@/components/module/btcPage/SendBtcForm.vue")
    ),
    ConnectBtcMenu: defineAsyncComponent(
        () => import("@/components/module/btcPage/ConnectBtcMenu.vue")
    ),
  },
  setup() {
    const useBtc = useBtcStore();
    const isConnected = computed(() => useBtc.getCurrentWallet.isConnected);
    const userAddress = computed(() => useBtc.getCurrentWallet.btcAddress);
    const userBtcBalance = computed(() => useBtc.getCurrentWallet.btcBalance);

    return {userAddress, userBtcBalance, isConnected};
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
