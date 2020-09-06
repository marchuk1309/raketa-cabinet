<template>
  <div class="d-flex ai-c">
    <div class="text-right">
      <p v-if="userStatus === 'user'" class="mb-0">{{fullName}}</p>
      <p v-if="userStatus === 'company'" class="mb-0">{{companyName}}</p>
      <p class="mb-0">Баланс: <span class="text-primary">{{balance | number}} р.</span></p>
    </div>
    <b-dropdown right class="main-header__profile-wrap ml-4" size="small"  variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content>
        <div class="main-header__profile">
          <img src="https://www.aalforum.eu/wp-content/uploads/2016/04/profile-placeholder.png" alt="">
          <div class="main-header__profile--notice">
          </div>
        </div>
      </template>
      <template v-for="item in currentMenu">
        <b-dropdown-item>
          <router-link v-if="item.routerLink" :to="item.routerLink" class="text-decoration-none main-header__profile-link" active-class="text-primary"><font-awesome-icon :icon="['fas', item.icon]" class="mr-3"/>{{item.name}}</router-link>
          <a v-else @click.prevent="menuMethod(item.clickMethod)" class="text-decoration-none main-header__profile-link"><font-awesome-icon :icon="['fas', item.icon]" class="mr-3"/>{{item.name}}</a>
        </b-dropdown-item>
        <b-dropdown-divider v-if="item.hasDivider"></b-dropdown-divider>
      </template>
<!--      <b-dropdown-item>-->
<!--        <router-link :to="{name: 'profileSettings'}" class="text-decoration-none main-header__profile-link" active-class="text-primary"><b-icon-person-fill class="mr-3"/>Мой профиль</router-link>-->
<!--      </b-dropdown-item>-->
<!--      <b-dropdown-item>-->
<!--        <a class="text-decoration-none main-header__profile-link"><b-icon-power class="mr-3"/>Выйти</a>-->
<!--      </b-dropdown-item>-->
<!--      <b-dropdown-divider></b-dropdown-divider>-->
<!--      <b-dropdown-item>-->
<!--        <router-link :to="{name: 'companySettings'}" class="text-decoration-none main-header__profile-link" active-class="text-primary"><b-icon-person-fill class="mr-3"/>Профиль заведения</router-link>-->
<!--      </b-dropdown-item>-->
    </b-dropdown>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "HeaderProfile",
    data: () => ({
      userMenu: [
        {name: 'Мой профиль', routerLink: {name: 'profileSettings'}, icon: 'user'},
        {name: 'Выйти', clickMethod: 'logout', icon: 'power-off', hasDivider: true},
        {name: 'Профиль компании', routerLink: {name: 'companySettings'}, icon: 'suitcase'}
      ],
      companyMenu: [
        {name: 'Профиль компании', routerLink: {name: 'companySettings'}, icon: 'suitcase'},
        {name: 'Заблокировать', clickMethod: 'banCompany', icon: 'power-off'},
        {name: 'Выйти', clickMethod: 'logout', icon: 'power-off', hasDivider: true},
        {name: 'Мой профиль', routerLink: {name: 'profileSettings'}, icon: 'user'}
      ],
    }),
    methods: {
      menuMethod(method) {
        this[method]()
      },
      logout() {
        console.log('LOGOUT')
      },
      banCompany() {
        console.log('BAN')
      }
    },
    computed: {
      ...mapGetters(['fullName', 'companyName', 'balance', 'userStatus']),
      currentMenu() {
        switch (this.userStatus) {
          case "user":
            return this.userMenu
          case "company":
            return this.companyMenu
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .main-header {
    &__profile {
      width: 3em;
      height: 3em;
      min-width: 3em;
      border-radius: 50%;
      border: 4px solid #ffffff;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
      &-link {
        color: $textColor;
      }
      &--notice {
        position: absolute;
        left: 70%;
        top: 70%;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        border: 1px solid #fff;
        background: $redGrad;
      }
    }
  }
</style>

<style lang="scss">
  .main-header__profile-wrap {
    .btn {
      padding: 0;
    }
  }
</style>