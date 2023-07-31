<template>
  <Transition mode="out-in">
    <div>
      <BaseLoading v-if="isLoading" />
      <form :class="transaction ? 'mb-2' : ''">
        <div class="flex-center mb-5">
          <BaseInput v-model="form.receiver" label="Receiver" class="mr-2"/>
          <BaseInput v-model="form.amount" label="Amount" class="ml-2"/>
        </div>
        <BaseButton buttonColor="#E95420" @click="submitForm">
          SEND
        </BaseButton>
      </form>
      <div v-if="getEtherscanLink" class="etherscan-link">
        <a
          :href="getEtherscanLink"
          target="_blank"
          class="main-black-text"
        >
          Etherscan: {{ transaction }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import {useErc20Token} from "@/stores/useErc20Token";

export default defineComponent({
  name: "SendEtherForm",
  data() {
    return {
      isLoading: false,
      transaction: "",
      form: {
        receiver: "",
        amount: "",
      },
    }
  },
  setup() {
    const erc20Token = useErc20Token();

    async function sendCurrency(payload) {
      return await erc20Token.sendCurrency(payload)
    }
    return {
      erc20Token, sendCurrency
    }
  },
  methods: {
    async submitForm() {
      const payload = {
        receiver: this.form.receiver.trim(),
        amount: this.form.amount,
      }
      this.isLoading = true;
      this.transaction = await this.sendCurrency(payload).then(res => {
        alert(res.hash);
        return res.hash;
      });
      this.form = {
        receiver: "",
        amount: "",
      };
      this.isLoading = false;
    }
  },
  computed: {
    getEtherscanLink() {
      return this.transaction ? `https://sepolia.etherscan.io/tx/${this.transaction}` : null;
    }
  }
})
</script>

<style scoped>
.etherscan-link {
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 450px;
  overflow: hidden;
  cursor: pointer;
}
</style>
