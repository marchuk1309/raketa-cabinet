<template>
  <div :style="{alignItems: stretch ? 'stretch' : 'flex-start'}" class="profile-body flex jc-sb">
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
    computed: {
      stretch() {
        if (this.$route.name !== "profileSettings") {
          return false
        }
        return true
      }
    },
    mounted() {
      this.$store.commit('changeUserStatus', 'company')
    }
  }
</script>

<style lang="scss" scoped>
</style>