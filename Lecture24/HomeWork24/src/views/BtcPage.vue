<template>
  <div class="btc-card h-100 flex-center">
    <BaseTabs :tabs="list"></BaseTabs>
<!--    <BtcCard />-->
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "EtherPage",
  components: {
    BtcCard: defineAsyncComponent(
        () => import("@/components/module/btcPage/BtcCard.vue")
    ),
  },
  computed: {
    list() {
      return [
        {
          id: 0,
          title: 'My wallet',
          component: defineAsyncComponent(
              () => import('@/components/module/btcPage/BtcCard.vue')
          ),
          data: {},
        },
        {
          id: 1,
          title: 'My wallet 2',
          component: defineAsyncComponent(
              () => import('@/components/module/btcPage/BtcCard.vue')
          ),
          data: {},
        },
      ]
    }
  }
}
</script>

<style scoped>
.btc-card {
  max-width: 500px;
  width: 100%;
}
</style>
