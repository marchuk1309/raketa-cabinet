<template>
  <div class="profile-body flex jc-sb">
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
    mounted() {
      this.$store.commit('changeUserStatus', 'user')
    }
  }
</script>

<style lang="scss" scoped>
  .profile-body {
    align-items: flex-start;
  }
</style>