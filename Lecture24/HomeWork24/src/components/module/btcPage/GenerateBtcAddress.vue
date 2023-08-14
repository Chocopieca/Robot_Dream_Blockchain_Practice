<template>
  <form>
    <BaseInput
      v-model="someValue"
      label="Some value"
      class="mb-5"
      :error="errors.getError('someValue')"
      @clearError="errors.clearError('someValue')"
    />
    <BaseButton
      buttonColor="#E95420"
      class="connect-button"
      @click="onGenerateAddress"
    >
      Generate address
    </BaseButton>
  </form>
</template>

<script>
import {useBtcStore} from "@/stores/useBtcStore";
import useValidateModule from "@/composable/useValidateModule";

export default {
  name: "GenerateBtcAddress",
  setup() {
    const useBtc = useBtcStore();
    const validateModule = useValidateModule();
    return {
      validateModule
    }
  },
  data() {
    return {
      someValue: "",
      errors: this.validateModule.errorHandlerModule.value,
    }
  },
  methods: {
    onGenerateAddress() {
      if (!this.validate(this.someValue)) return
      console.log('onGenerateAddress')
    },
    validate(someValue) {
      return this.validateModule.validateForm([
        { key: "someValue", value: someValue, method: "isNotEmpty" },
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
