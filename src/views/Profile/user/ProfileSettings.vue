<template>
  <div class="profile-card card">
    <div class="profile-card__head flex jc-sb ai-c">
      <h2 class="profile-card__title mb-0">{{currentTab.str}}</h2>
      <div class="profile-card__tabs flex">
        <my-button
          :key="tab.str"
          v-for="tab in tabs"
          :color="tab.str === currentTab.str ? 'primary' : 'unactive'"
          @click="setCurrentTab(tab)"
        >
          {{tab.str}}
        </my-button>
      </div>
    </div>
    <div class="profile-card__body">
      <component
        v-if="currentTab !== null"
        :is="currentTab.component"
      ></component>
    </div>
  </div>
</template>

<script>
  import PrivateInfo from "../../../components/profile/user/PrivateInfo";
  import Contacts from "../../../components/profile/user/Contacts";
  import Notices from "../../../components/profile/user/Notices";
  import Access from "../../../components/profile/user/Access";

  export default {
    name: 'ProfileSettings',
    data: () => ({
      currentTab: null,
      tabs: [
        {str: 'Личные данные', component: PrivateInfo},
        {str: 'Контакты', component: Contacts},
        {str: 'Оповещения', component: Notices},
        {str: 'Доступ', component: Access},
      ]
    }),
    methods: {
      setCurrentTab(tab) {
        this.currentTab = tab
        sessionStorage.setItem('currentProfileSettingsTab', this.tabs.indexOf(tab))
      }
    },
    beforeMount() {
      if (sessionStorage.getItem('currentProfileSettingsTab') && +sessionStorage.getItem('currentProfileSettingsTab') !== -1 ) {
        this.currentTab = this.tabs[+sessionStorage.getItem('currentProfileSettingsTab')]
      } else {
        this.currentTab = this.tabs[0]
      }
    },
  }
</script>

<style lang="scss" scoped>
  .profile-card {
    width: calc(100% - 27em);
    &__head {
      margin-bottom: 3em;
    }
    &__body {
      height: 100%;
    }
    &__title {
      font-size: 1.5em;
    }
    &__tabs {
      .my-btn {
        padding-left: 2em;
        padding-right: 2em;
        &:not(:last-child) {
          margin-right: .5em;
        }
        @media (max-width: 1600px) {
          padding-left: 1.5em;
          padding-right: 1.5em;
        }
      }
    }
  }
</style>