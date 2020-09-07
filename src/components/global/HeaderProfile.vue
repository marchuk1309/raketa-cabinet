<template>
  <div class="d-flex ai-c">
    <div class="text-right">
      <p v-if="userStatus === 'user'" class="mb-0">{{fullName}}</p>
      <p v-if="userStatus === 'company'" class="mb-0">{{companyName}}</p>
      <p class="mb-0">Баланс: <span v-b-modal.addBalanceModal  class="modal-btn text-primary">{{balance | number}} р.</span></p>
      <b-modal
          id="addBalanceModal"
          header-close-label
          hide-footer
          header-border-variant="white"
      >
        <div class="d-block">
          <h4 class="mb-5 modal-title text-uppercase text-center">Пополнение денежных средств</h4>
          <b-row class="pl-5 pr-5 pb-4">
            <b-col>
              <b-form-select size="lg" class="mb-3" v-model="currentPaymentMethod" :options="paymentMethods"></b-form-select>
              <b-form-input size="lg" class="mb-3" v-model="operationSum" onkeyup="this.value = this.value.replace(/[^\d]/g,'');" placeholder="Введите сумму"/>
              <my-button class="w-100 mb-3" size="medium">Выполнить</my-button>
              <router-link class="d-block add-balance-modal__link" :to="{name: 'TransAdmission'}">Перейти в историю операций</router-link>
            </b-col>
            <b-col>
              <div class="card add-balance-modal__info">
                <p class="title"><b-icon-info/> Справка</p>
                <hr>
                <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, sequi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus deleniti deserunt, dignissimos magnam perferendis quam quas quos soluta ullam voluptatibus.</p>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </div>
    <b-dropdown right class="main-header__profile-wrap ml-4" size="small"   variant="link" toggle-class="text-decoration-none" no-caret>
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
      </template>
      <div class="px-4" v-if="userStatus === 'company'">
        <a class="main-header__profile--tel" href="tel:8 800 500 90 90 ">8 800 500 90 90</a>
        <p>Телефон технической поддержки для заведений</p>
      </div>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item>
        <router-link v-if="userStatus === 'company'" :to="{name: 'profileSettings'}" class="text-decoration-none main-header__profile-link" active-class="text-primary">
          <font-awesome-icon :icon="['fas', 'user']" class="mr-3"/>Мой профиль
        </router-link>
        <router-link v-else-if="userStatus === 'user'" :to="{name: 'companySettings'}" class="text-decoration-none main-header__profile-link" active-class="text-primary">
          <font-awesome-icon :icon="['fas', 'user']" class="mr-3"/>Профиль компании
        </router-link>
      </b-dropdown-item>
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
      currentPaymentMethod: null,
      paymentMethods: [
        {value: null, text: 'Выберите способ пополнения'},
        {value: 1, text: 'Мобыльный телефон'},
        {value: 2, text: 'Банковская карта'},
        {value: 3, text: 'Яндекс Деньги'}
      ],
      operationSum: null,
      userMenu: [
        {name: 'Мой профиль', routerLink: {name: 'profileSettings'}, icon: 'user'},
        {name: 'Выйти', clickMethod: 'logout', icon: 'power-off'},
      ],
      companyMenu: [
        {name: 'Профиль компании', routerLink: {name: 'companySettings'}, icon: 'suitcase'},
        {name: 'Заблокировать', clickMethod: 'banCompany', icon: 'lock'},
        {name: 'Выйти', clickMethod: 'logout', icon: 'power-off'},
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
  .add-balance-modal {
    &__link {
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
    }
    &__info {
      .title {
        font-size: 1.25em;
        line-height: 1;
        margin-bottom: 0;
      }

      .text {
        height: 8em;
        overflow: scroll;
        margin-bottom: 0;
      }
    }
  }
  .modal-btn {
    cursor: pointer;
  }
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
      &--tel {
        font-size: 1.5rem;
        text-decoration: none;
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
  #addBalanceModal .modal-dialog {
    min-width: 700px;
  }
  .main-header__profile-wrap {
    .btn {
      padding: 0;
    }
    ul {
      min-width: 220px;
    }
  }
</style>