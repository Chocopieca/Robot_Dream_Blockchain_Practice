<template>
  <Transition mode="out-in">
    <ConnectBtcMenu v-if="!isConnected"/>
    <BaseCard v-else width="500" bgColor="#ffffff">
      <h1 class="ma-0 main-bright-red-text">Btc</h1>
      <div class="d-flex justify-start align-center">
        <div class="mr-2">Balance:</div>
        <div class="size20-weight700 main-red-text mr-2">
          {{ userBtcBalance }} BTC
        </div>
        <RefreshIcon @click="updateBalance" class="cursor-pointer"/>
      </div>
      <BaseDivider class="my-2" color="#000000"/>
      <div>Address:</div>
      <a
        :href="getAddressLink"
        class="address main-black-text"
        target="_blank"
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

    async function getBtcBalance() {
      await useBtc.getBtcBalance()
    }

    return {userAddress, userBtcBalance, isConnected, getBtcBalance};
  },
  methods: {
    async updateBalance() {
      await this.getBtcBalance();
    }
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
