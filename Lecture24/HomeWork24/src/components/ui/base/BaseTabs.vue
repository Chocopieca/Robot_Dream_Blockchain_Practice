<template>
  <BaseCard bgColor="#fff" class="position-relative">
    <template v-slot>
      <div class="tabs-wrapper">
        <div
          v-for="item of tabs"
          :key="`tab-button-${item.id}`"
          class="tab"
          :class="selectedTab === item.title ? 'active-tab' : ''"
          @click.prevent="changeTab(item.title)"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>
      <Transition>
        <component
          v-if="selectedTabContent"
          :is="selectedTabContent.component"
          :options="selectedTabContent.data"
        />
      </Transition>
    </template>
  </BaseCard>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseTabs",
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedTab: this.tabs[0].title,
    };
  },
  methods: {
    changeTab(title) {
      this.selectedTab = title;
    },
  },
  computed: {
    selectedTabContent() {
      return this.tabs.find((item) => {
        return item.title == this.selectedTab;
      });
    },
  },
});
</script>

<style scoped lang="scss">
.tabs-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  transform: translateY(calc(-100% + 1px));
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    bottom: -19px;
    background-color: #fff;
    z-index: 11;
    border-top-right-radius: 15px;
  }

  .tab {
    background-color: #ebebeb;
    padding: 5px 10px;
    box-shadow: 0 0 15px hsl(0deg 0% 58% / 44%);
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;

    &.active-tab {
      background-color: #fff;
      z-index: 10;
    }
  }
}
</style>
