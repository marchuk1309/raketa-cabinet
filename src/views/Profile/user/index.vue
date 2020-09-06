<template>
  <div :style="{alignItems: stretch ? 'stretch' : 'flex-start'}" class="profile-body flex jc-sb">
    <user-card></user-card>
    <router-view></router-view>
  </div>
</template>

<script>

  import UserCard from "../../../components/profile/user/UserCard";

  export default {
    name: "Profile",
    components: {
      UserCard
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
      this.$store.commit('changeUserStatus', 'user')
    }
  }
</script>

<style lang="scss" scoped>
</style>