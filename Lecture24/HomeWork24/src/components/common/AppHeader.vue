<template>
  <header class="container-fluid">
    <nav class="container">
      <div class="px-5">
        <router-link to="eth">ETH</router-link>
        <router-link to="erc20">ERC20</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader"
}
</script>

<style scoped lang="scss">
header {
  background: var(--color-orange);
  padding: 10px 0;
  max-width: 100%;

  a {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
