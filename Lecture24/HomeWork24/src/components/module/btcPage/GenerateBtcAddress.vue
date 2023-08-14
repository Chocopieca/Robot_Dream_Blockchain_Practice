<template>
  <form>
    <h3>Generate BTC address</h3>
    <div class="mb-5">Generate a BTC address for your wallet, then connect it.</div>

    <div class="flex-center">
      <BaseInput
        v-model="mnemonic"
        label="Mnemonic"
        :animateTitle="false"
        class="mr-5"
        disabled
      />
      <BaseIcon
        iconName="content-copy.svg"
        @click="copyURL(mnemonic)"
        :iconColor="{color: '#E95420', hover: '#ff4300'}"
      />
    </div>
    <div class="flex-center">
      <BaseInput
        v-model="privateKey"
        label="Private key"
        :animateTitle="false"
        class="mr-5"
        disabled
        :error="errors.getError('privateKey')"
        @clearError="errors.clearError('privateKey')"
      />
      <BaseIcon
        iconName="content-copy.svg"
        @click="copyURL(privateKey)"
        :iconColor="{color: '#E95420', hover: '#ff4300'}"
      />
    </div>
    <div class="flex-center">
      <BaseInput
        v-model="publicKey"
        label="Public key"
        :animateTitle="false"
        class="mb-5 mr-5"
        disabled
      />
      <BaseIcon
        iconName="content-copy.svg"
        @click="copyURL(publicKey)"
        :iconColor="{color: '#E95420', hover: '#ff4300'}"
      />
    </div>
    <BaseButton
      buttonColor="#E95420"
      class="connect-button mb-5"
      @click="onGenerateAddress"
    >
      Generate address
    </BaseButton>
    <BaseButton
      buttonColor="#E95420"
      class="connect-button mb-5"
      @click="onConnectAddress"
    >
      Connect address
    </BaseButton>
  </form>
</template>

<script>
import {useBtcStore} from "@/stores/useBtcStore";
import useValidateModule from "@/composable/useValidateModule";

export default {
  name: "GenerateBtcAddress",
  data() {
    return {
      mnemonic: "",
      privateKey: "",
      publicKey: "",
      errors: this.validateModule.errorHandlerModule.value,
    }
  },
  setup() {
    const useBtc = useBtcStore();
    const validateModule = useValidateModule();
    function getNetwork() {
      useBtc.getNetwork();
    }
    async function generateMnemonic() {
      return await useBtc.generateMnemonic();
    }
    async function initBtcWallet(privateKey) {
      return await useBtc.initBtcWallet(privateKey);
    }

    return {
      useBtc, validateModule, getNetwork, generateMnemonic, initBtcWallet,
    }
  },
  mounted() {
    this.getNetwork();
  },
  methods: {
    async copyURL(text) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Copied');
      } catch($e) {
        alert('Cannot copy');
      }
    },
    async onGenerateAddress() {
      const data = await this.generateMnemonic();
      const { privateKey, publicKey, mnemonic } = data;
      this.privateKey = privateKey;
      this.publicKey = publicKey;
      this.mnemonic = mnemonic;
    },
    async onConnectAddress() {
      if (!this.validate(this.privateKey)) return
      this.isLoading = true;
      await this.initBtcWallet(this.privateKey);
      this.isLoading = false;
    },
    validate(privateKey) {
      return this.validateModule.validateForm([
        { key: "privateKey", value: privateKey, method: "isNotEmpty" },
        { key: "privateKey", value: privateKey, method: "isPrivateKey" },
      ])
    }
  }
}
</script>

<style scoped>
.connect-button {
  width: 100%;
}
</style>
