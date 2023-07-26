<template>
  <Transition mode="out-in">
    <div>
      <BaseLoading v-if="isLoading" />
      <form class="mb-2">
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
        >
          Etherscan: {{ transaction.hash }}
        </a>
      </div>
    </div>
  </Transition>
</template>

<script>
import {defineComponent} from "vue";
import {useEtherJsStore} from "@/stores/useEtherJs";

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
    const useEtherJs = useEtherJsStore();

    async function onSendEth(payload) {
      return await useEtherJs.onSendEth(payload);
    }
    async function getUserData() {
      return await useEtherJs.getUserData();
    }

    return {useEtherJs, onSendEth, getUserData};
  },
  methods: {
    async submitForm() {
      const payload = {
        receiver: this.form.receiver,
        amount: this.form.amount,
      }
      this.isLoading = true;
      this.transaction = await this.onSendEth(payload);
      await this.getUserData();
      this.form = {
        receiver: "",
        amount: "",
      };
      this.isLoading = false;
    }
  },
  computed: {
    getEtherscanLink() {
      return this.transaction ? `https://sepolia.etherscan.io/tx/${this.transaction.hash}` : null;
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
