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
  import TechnicalInfo from "../../../components/profile/company/TechnicalInfo";
  import LegalInfo from "../../../components/profile/company/LegalInfo";
  import Contacts from "../../../components/profile/company/Contacts";
  import Socials from "../../../components/profile/company/Socials";
  export default {
    name: 'ProfileSettings',
    data: () => ({
      currentTab: null,
      tabs: [
        {str: 'Тех. данные', component: TechnicalInfo},
        {str: 'Юр. данные', component: LegalInfo},
        {str: 'Контакты', component: Contacts},
        {str: 'Соцсети', component: Socials},
      ]
    }),
    methods: {
      setCurrentTab(tab) {
        this.currentTab = tab
        sessionStorage.setItem('currentCompanySettingsTab', this.tabs.indexOf(tab))
      }
    },
    beforeMount() {
      this.$store.commit('setSiteContext', 'Для корректной работы кабинета, указывайте только настоящие данные')
      if (sessionStorage.getItem('currentCompanySettingsTab') && +sessionStorage.getItem('currentCompanySettingsTab') !== -1 ) {
        this.currentTab = this.tabs[+sessionStorage.getItem('currentCompanySettingsTab')]
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