<template>
  <div id="app">
    <div v-if="isLoading" class="loader"></div>
    <component :is="layout"></component>
  </div>
</template>

<script>
  import MainLayout from "./layouts/MainLayout";
  import EmptyLayout from "./layouts/EmptyLayout";
  export default {
    data: () => ({
      isLoading: false
    }),
    computed: {
      layout() {
        return (this.$route.meta.layout || 'empty') + '-layout'
      }
    },
    components: {
      MainLayout,
      EmptyLayout
    }
  }
</script>

<style lang="scss">
</style>
