<script>
import {useBtcStore} from "@/stores/useBtcStore";
export default {
  name: "ChangeBtcNetwork",
  setup() {
    const useBtcStore = useBtcStore();

    function setCurrentNetwork(network) {
      useBtcStore.setCurrentNetwork(network);
    }

    return {setCurrentNetwork}
  }
}
</script>

<template>
  <div></div>
</template>

<style scoped>

</style>