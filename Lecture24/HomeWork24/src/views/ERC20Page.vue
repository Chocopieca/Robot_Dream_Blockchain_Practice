<template>
  <div class="h-100 flex-center">
    <BaseCard width="500" bgColor="#ffffff">
      <h1 class="ma-0">{{ name }}</h1>
      <div>Balance: {{ balance }} {{ symbol }}</div>
      <BaseDivider class="my-2" color="#000000"/>
      <div>Address:</div>
      <div class="address">
        {{ getAddress }}
      </div>
      <BaseDivider class="my-2" color="#000000"/>
      <SendErc20Form />
    </BaseCard>
  </div>
</template>

<script>
import {useErc20Token} from "@/stores/useErc20Token";
import {computed, defineAsyncComponent} from "vue";

export default {
  name: "ERC20Page",
  components: {
    SendErc20Form: defineAsyncComponent(() =>
        import("@/components/module/erc20Page/SendErc20Form.vue")
    )
  },
  data() {
    return {
      form: {
        address: "",
        amount: "",
      }
    }
  },
  setup() {
    const erc20Token = useErc20Token();
    const balance = computed(() => erc20Token.getCurrentBalance ?? "-.----");
    const symbol = computed(() => erc20Token.symbol ?? "");
    const name = computed(() => erc20Token.name ?? "");

    async function initErc20() {
      await erc20Token.init();
    }

    return {
      erc20Token, balance, symbol, name, initErc20
    }
  },
  async created() {
    await this.initErc20();
  },
  computed: {
    getAddress() {
      let address = "0x5aCD656a61d4b2AAB249C3Fe3129E3867ab99283";
      return `${address.slice(0, 10)}...${address.slice(-10)}`
    }
  }
}
</script>

<style scoped>
.address {
  max-width: 250px;
  overflow: hidden;
}
</style>
