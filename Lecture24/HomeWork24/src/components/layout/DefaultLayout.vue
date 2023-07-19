<template>
  <div class="flex-space-between-column h-100-vh">
    <div>
<!--      <AppHeader />-->
      <main class="bh-main">
        <slot></slot>
      </main>
    </div>
<!--    <AppFooter />-->
  </div>
<!--  <IndexModal />-->
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from "vue";

export default defineComponent({
  name: "DefaultLayout",
  components: {
    // AppHeader: defineAsyncComponent(
    //   () => import("@/components/common/AppHeader.vue")
    // ),
    // AppFooter: defineAsyncComponent(
    //   () => import("@/components/common/AppFooter.vue")
    // ),
    // IndexModal: defineAsyncComponent(
    //   () => import("@/components/modal/IndexModal.vue")
    // ),
  },
  data() {
    return {
      isLoading: true,
    };
  },
});
</script>
