<template>
  <div v-if="allCards" class="cards-list flex fw-w">
    <my-card class="mr-4 mb-5" v-for="card in allCards" :key="card.number" :card="card" />
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import MyCard from "../components/MyCard";

  export default {
    name: "MyCards",
    computed: {
      ...mapGetters(['allCards'])
    },
    mounted() {
      this.$store.commit('setSiteContext', null)
    },
    components: {
      MyCard
    }
  }
</script>

<style lang="scss" scoped>
</style>