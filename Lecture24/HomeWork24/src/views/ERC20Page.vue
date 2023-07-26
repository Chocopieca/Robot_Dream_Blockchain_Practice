<template>
  <div class="h-100 flex-center">
    <BaseCard width="500" bgColor="#ffffff">
      <h1 class="ma-0">ERC20</h1>
      <div>Balance: 0 MKK</div>
      <BaseDivider class="my-2" color="#000000"/>
      <div>Address:</div>
      <div class="address">
        {{ getAddress }}
      </div>
      <BaseDivider class="my-2" color="#000000"/>
      <form>
        <div class="flex-center mb-5">
          <BaseInput label="Receiver" class="mr-2"/>
          <BaseInput label="Amount" class="ml-2"/>
        </div>
        <BaseButton buttonColor="#E95420">
          SEND
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script>
export default {
  name: "ERC20Page",
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
