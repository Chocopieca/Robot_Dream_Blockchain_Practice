<template>
  <div class="h-100 flex-center">
    <BaseCard width="400" bgColor="#5E2750">
      <h1 class="ma-0">ETH</h1>
      <div>Balance: {{ getBalance }} ETH</div>
      <BaseDivider class="my-2"/>
      <div>Address:</div>
      <div class="address">
        {{ getAddress }}
      </div>
      <BaseDivider class="my-2"/>
      <form>
        <div class="flex-center mb-5">
          <BaseInput v-model="form.receiver" label="Receiver" class="mr-2"/>
          <BaseInput v-model="form.amount" label="Amount" class="ml-2"/>
        </div>
        <BaseButton buttonColor="#E95420" @click="submitForm">
          SEND
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script>
import { ethers } from "ethers";
export default {
  name: "EtherPage",
  data() {
    return {
      myAddress: "0x5aCD656a61d4b2AAB249C3Fe3129E3867ab99283",
      myBalance: null,
      form: {
        receiver: "",
        amount: "",
      }
    }
  },
  async mounted() {
    const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`);
    const myBalance = await provider.getBalance(this.myAddress);
    this.myBalance = ethers.formatUnits(myBalance, 18);
  },
  methods: {
    submitForm() {
      const amount = this.form.amount;
      const receiver = this.form.receiver;
      alert(`Sending ${amount ? amount : "0"} ETH to ${receiver ? receiver : "???"}`);
    }
  },
  computed: {
    getAddress() {
      return `${this.myAddress.slice(0, 10)}...${this.myAddress.slice(-10)}`
    },
    getBalance() {
      return this.myBalance ?? "0"
    },
  }
}
</script>

<style scoped>
.address {
  max-width: 250px;
  overflow: hidden;
}
</style>
