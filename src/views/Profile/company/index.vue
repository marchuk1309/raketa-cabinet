<template>
  <div class="profile-body flex jc-sb">
    <company-card></company-card>
    <router-view></router-view>
  </div>
</template>

<script>

  import CompanyCard from "../../../components/profile/company/CompanyCard";

  export default {
    name: "Profile",
    components: {
      CompanyCard
    },
    mounted() {
      this.$store.commit('changeUserStatus', 'company')
    }
  }
</script>

<style lang="scss" scoped>
  .profile-body {
    align-items: flex-start;
  }
</style>