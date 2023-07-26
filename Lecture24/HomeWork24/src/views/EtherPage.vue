<template>
  <div class="h-100 flex-center">
    <BaseCard width="500" bgColor="#5E2750">
      <h1 class="ma-0">ETH</h1>
      <div>Balance: {{ userEtherBalance }} ETH</div>
      <BaseDivider class="my-2"/>
      <div>Address:</div>
      <div class="address">
        {{ getAddress }}
      </div>
      <BaseDivider class="my-2"/>
      <SendEtherForm />
    </BaseCard>
  </div>
</template>

<script>
import {useEtherJsStore} from "@/stores/useEtherJs";
import {computed, defineAsyncComponent} from "vue";
export default {
  name: "EtherPage",
  components: {
    SendEtherForm: defineAsyncComponent(() => import("@/components/module/etherPage/SendEtherForm.vue"))
  },
  setup() {
    const useEtherJs = useEtherJsStore();
    const userAddress = computed(() => useEtherJs.userAddress);
    const userEtherBalance = computed(() => useEtherJs.userEtherBalance);

    return {useEtherJs, userAddress, userEtherBalance};
  },
  computed: {
    getAddress() {
      return this.userAddress ? `${this.userAddress.slice(0, 10)}...${this.userAddress.slice(-10)}` : "---"
    },
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
