<template>
  <div class="main-header">
    <b-dropdown v-if="userStatus === 'user'" class="main-header__dropdown" right size="small"  variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content>
        <div class="main-header__item main-header__bonuses">
          <font-awesome-icon size="xs" :icon="['fas', 'gift']" />
          <div class="main-header__item--counter">{{discounts.length}}</div>
        </div>
      </template>
      <div class="main-header__dropdown-head">
        <h5>Акции</h5>
        <span>{{discounts.length}}</span>
      </div>
      <div class="main-header__dropdown-list">
        <div class="py-2"></div>
        <div class="main-header__dropdown-row" v-for="discount in discounts">
          <div class="main-header__dropdown--image">
            <img v-if="discount.image" :src="discount.image" alt="">
          </div>
          <div>
            <p class="main-header__dropdown--name">{{discount.name}}</p>
            <p class="main-header__dropdown--descript">{{discount.descript}} <router-link to="/">Перейти</router-link></p>
          </div>
        </div>
        <div class="py-2"></div>
      </div>
      <b-dropdown-item class="main-header__dropdown--btn">
        <router-link :to="{name: 'TransAdmission'}">Смотреть все акции <font-awesome-icon :icon="['fas', 'angle-right']"/> </router-link>
      </b-dropdown-item>
    </b-dropdown>
    <b-dropdown v-if="userStatus === 'user'" class="main-header__dropdown" right size="small"  variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content>
        <div class="main-header__item main-header__notices">
          <font-awesome-icon size="xs" :icon="['fas', 'money-bill']" />
          <div class="main-header__item--counter">{{notices.length}}</div>
        </div>
      </template>
      <div class="main-header__dropdown-head">
        <h5>Транзакции</h5>
        <span>{{discounts.length}}</span>
      </div>
      <div class="main-header__dropdown-list">
        <div class="py-2"></div>
        <div class="main-header__dropdown-row" v-for="notice in notices">
          <div class="main-header__dropdown--image">
            <img v-if="notice.image" :src="notice.image" alt="">
          </div>
          <div>
            <p class="main-header__dropdown--name">{{notice.name}}</p>
            <p class="main-header__dropdown--descript">{{notice.descript}} <router-link to="/">Перейти</router-link></p>
          </div>
        </div>
        <div class="py-2"></div>
      </div>
      <b-dropdown-item class="main-header__dropdown--btn">
        <router-link :to="{name: 'TransAdmission'}">Смотреть транзакции <font-awesome-icon :icon="['fas', 'angle-right']"/> </router-link>
      </b-dropdown-item>
    </b-dropdown>
    <b-dropdown v-if="userStatus === 'company'" class="main-header__dropdown" right size="small"  variant="link" toggle-class="text-decoration-none" no-caret>
      <template v-slot:button-content>
        <div class="main-header__item main-header__notices">
          <font-awesome-icon size="xs" :icon="['fas', 'bell']" />
          <div class="main-header__item--counter">{{notices.length}}</div>
        </div>
      </template>
      <div class="main-header__dropdown-head">
        <h5>Уведомления</h5>
        <span>{{companyNotices.length}}</span>
      </div>
      <div class="main-header__dropdown-list">
        <div class="py-2"></div>
        <div class="main-header__dropdown-row" v-for="notice in companyNotices">
          <div class="main-header__dropdown--image" :class="notice.background">
            <font-awesome-icon :icon="notice.icon"/>
          </div>
          <div>
            <p class="main-header__dropdown--name">{{notice.name}}</p>
            <p class="main-header__dropdown--descript">{{notice.descript}}</p>
          </div>
        </div>
        <div class="py-2"></div>
      </div>
    </b-dropdown>
    <b-dropdown class="mr-4" variant="outline-primary" id="dropdown-1" :text="currentLanguage">
      <b-dropdown-item
          @click="currentLanguage = language"
          :key="language"
          v-for="language in languages"
          :active="currentLanguage === languages"
      >
        {{language}}
      </b-dropdown-item>
    </b-dropdown>
    <header-profile/>
  </div>
</template>

<script>
  import HeaderProfile from "./HeaderProfile";
  import {mapGetters} from "vuex";
  export default {
    name: "AppHeader",
    data: () => ({
      currentLanguage: 'Русский',
      languages: ['Русский', 'English'],
      discounts: [
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
      ],
      notices: [
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
        {name: 'Название компании', descript: 'Короткое но ёмкое описание акции.'},
      ],
      companyNotices: [
        {name: 'Техподдержка', descript: 'Поступил ответ на заявку №1290', icon: 'life-ring', background: 'orange'},
        {name: 'Raketa', descript: 'Увеличьте просмотры на сайте', icon: 'rocket', background: 'primary'},
        {name: 'Техподдержка', descript: 'Короткое но ёмкое описание акции.', icon: 'life-ring', background: 'orange'},
        {name: 'Техподдержка', descript: 'Короткое но ёмкое описание акции.', icon: 'life-ring', background: 'orange'},
        {name: 'Raketa', descript: 'Ваш баланс близок к нулю', icon: 'rocket', background: 'primary'},
      ],
    }),
    components: {
      HeaderProfile
    },
    computed: {
      ...mapGetters(['userStatus'])
    }
  }
</script>

<style scoped lang="scss">
  .main-header {
    height: $headerHeight;
    display: flex;
    justify-content: flex-end;
    background: #ffffff;
    align-items: center;
    width: 100%;
    padding-right: 22em;
    z-index: 2;
    position: relative;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
    @media (max-width: 1600px) {
      padding-right: 2em;
    }
    &__dropdown {
      &-head {
        margin-top: -0.5rem;
        background-color: #f9fafc;
        padding: 15px 19px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h5 {
          margin: 0;
          text-transform: uppercase;
        }
        span {
          color: #ffffff;
          background-image: linear-gradient(to top, #f80723 0%, #f00000 100%);
          width: 20px;
          height: 20px;
          line-height: 22px;
          text-align: center;
          border-radius: 50%;
        }
      }
      &-list {
        max-height: 250px;
        overflow-y: scroll;
      }
      &-row {
        padding: 5px 19px;
        display: flex;
        align-items: center;
        p {
          margin: 0;
          line-height: 16px;
        }
      }
      &--image {
        width: 50px;
        height: 50px;
        min-width: 50px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #cccccc;
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #ffffff;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
        border: 2px solid #ffffff;
        &.primary {
          background-image: $primaryGrag;
        }
        &.orange {
          background-image: $orangeGrad;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &--name {
        font-weight: 500;
        margin-bottom: 4px!important;
      }
      &--btn {
        background-color: $primary;
        margin-bottom: -.5rem;
        transition: .2s;
        &:hover {
          background-color: darken($primary, 10%);
        }
      }

    }
    &__item {
      color: #666666;
      font-size: 2em;
      position: relative;
      height: 1em;
      width: 1em;
      margin-right: .5em;
      display: flex;
      align-items: center;
      justify-content: center;
      &--counter {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        width: 1.6em;
        height: 1.6em;
        border-radius: 50%;
        border: 1px solid #ffffff;
        background: $redGrad;
        text-align: center;
        color: #ffffff;
        position: absolute;
        bottom: 50%;
        font-size: .5em;
        left: 50%;
      }
    }
  }
</style>

<style lang="scss">
  .main-header__dropdown {
    ul {
      min-width: 290px;
    }
    &--btn {
      a {
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        line-height: 1;
        &.dropdown-item {
          padding: 15px 19px;
        }
        &:hover {
          text-decoration: none;
          color: #ffffff;
          background-color: transparent!important;
        }
      }
    }
  }
</style>