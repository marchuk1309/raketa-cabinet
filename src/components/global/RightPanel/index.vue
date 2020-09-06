<template>
  <div :class="{opened: isOpened}" class="right-panel card p-0">
    <div class="right-panel__header">
      <b-row class="m-0 h-100">
        <b-col @click="setCurrentTab(tab)" v-for="tab in tabs" class="right-panel__tab" :class="{active: currentTab.name === tab.name}" :key="tabs.name">
          <font-awesome-icon :icon="tab.icon"/>
        </b-col>
      </b-row>
      <div @click="isOpened = !isOpened" class="right-panel__toggler">
        <font-awesome-icon :icon="isOpened ? ['fas', 'caret-right'] : ['fas', 'caret-left']"/>
      </div>
    </div>
    <component :is="currentTab.component"/>
  </div>
</template>

<script>
  import Feedback from "./Feedback";
  import FavoriteCompanies from "./FavoriteCompanies";
  export default {
    name: "RightPanel",
    data: () => ({
      currentTab: {},
      tabs: [
        {
          name: 'favoriteCompanies',
          icon: ['fas', 'star'],
          component: FavoriteCompanies
        },
        {
          name: 'feedback',
          icon: ['fas', 'comments'],
          component: Feedback
        }
      ],
      isOpened: false,
    }),
    components: {
      FavoriteCompanies,
      Feedback
    },
    beforeMount() {
      if (sessionStorage.getItem('currentRightPanelTab') && +sessionStorage.getItem('currentRightPanelTab') !== -1 ) {
        this.currentTab = this.tabs[+sessionStorage.getItem('currentRightPanelTab')]
      } else {
        this.currentTab = this.tabs[0]
      }
    },
    methods: {
      setCurrentTab(tab) {
        this.currentTab = tab
        sessionStorage.setItem('currentRightPanelTab', this.tabs.indexOf(tab))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .right-panel {
    position: absolute;
    left: auto;
    right: -20em;
    top: 6em;
    width: 20em;
    z-index: 100;
    transition: .5s;
    height: calc(100% - 6em);
    display: flex;
    flex-direction: column;
    &.opened {
      right: 0;
    }
    &__header {
      background-color: #f9fafc;
      position: relative;
      height: 4em;
    }
    &__toggler {
      position: absolute;
      display: flex;
      padding-left: 1em;
      align-items: center;
      background-color: $primary;
      color: #ffffff;
      box-shadow: $cardShadow;
      border-radius: 50%;
      left: -2em;
      z-index: -2;
      top: 0;
      height: calc(4em - 3px);
      width: calc(4em - 3px);
      cursor: pointer;
    }
    &__tab {
      height: 100%;
      line-height: 4em;
      text-align: center;
      cursor: pointer;
      &.active {
        color: $primary;
        border-bottom: 3px solid $primary;
      }
    }
  }
</style>