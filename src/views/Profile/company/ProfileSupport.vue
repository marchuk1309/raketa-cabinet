<template>
  <div class=" support-card card">
    <div class="support-card__head flex jc-sb ai-c">
      <h2 class="support-card__title mb-0">{{currentTab.titleStr}}</h2>
      <div class="support-card__tabs flex">
        <my-button
            :key="tab.label"
            v-for="tab in tabs"
            :color="tab.label === currentTab.label ? 'primary' : 'unactive'"
            @click="setCurrentTab(tab)"
        >
          {{tab.label}}
        </my-button>
      </div>
    </div>
    <div class="support-card__body">
      <component
          v-if="currentTab !== null"
          :is="currentTab.component"
          @createRequest="setCurrentTab(tabs[0])"
          @backToAnswers="backToAnswers"
          @openRequestDialog="openRequestItem"
      ></component>
    </div>
  </div>
</template>

<script>
  import NewSupportRequest from "../../../components/profile/user/NewSupportRequest";
  import SupportAnswers from "../../../components/profile/SupportAnswers";
  import SupportRequestItem from "../../../components/profile/SupportRequestItem";

  export default {
    name: 'ProfileSupport',
    data: () => ({
      currentTab: null,
      tabs: [
        {titleStr: "Техподдержка", label: 'Новая заявка', component: NewSupportRequest},
        {titleStr: "Заявки в техподдержку", label: 'Заявки', component: SupportAnswers},
      ],
      requestItem: {
        titleStr: 'Диалог со специалистом',
        component: SupportRequestItem
      }

    }),
    methods: {
      setCurrentTab(tab) {
        this.currentTab = tab
        sessionStorage.setItem('currentSupportTab', this.tabs.indexOf(tab).toString())
        if (this.$route.name === 'profileSupportRequest') {
          this.$router.push({name: 'profileSupport'})
        }
      },
      async openRequestItem(id) {
        await this.$router.push({name: 'profileSupportRequest', params: {id: id}})
        this.currentTab = this.requestItem
      },
      async backToAnswers() {
        await this.$router.push({name: 'profileSupport'})
        this.currentTab = this.tabs[1]
      }
    },
    beforeMount() {
      if (this.$route.params.id) {
        this.currentTab = this.requestItem
      }
      else if (sessionStorage.getItem('currentSupportTab') && +sessionStorage.getItem('currentSupportTab') !== -1 ) {
        this.currentTab = this.tabs[+sessionStorage.getItem('currentSupportTab')]
      } else {
        this.currentTab = this.tabs[0]
      }
    },
  }
</script>

<style lang="scss" scoped>
  .support-card {
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
      }
    }
  }
</style>