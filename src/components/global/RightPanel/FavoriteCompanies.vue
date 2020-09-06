<template>
  <div class="favorite-companies-body">
    <p class="favorite-companies__title pl-4 pt-4 pr-4 flex ai-c">Избранные компании <span class=" ml-2 text-primary">{{companiesList.length}}</span></p>
    <div class="favorite-companies__tabs pl-4 pr-4 flex ai-c mb-4">
      <div v-for="(tab, index) in tabs" :key="tab.type">
        <a href="#" :class="{active: currentTab === tab}" @click.prevent="setCurrentTab(tab)"> {{tab.label}} </a>
        <span class="m-1">{{index !== tabs.length - 1 ? ' / ' : ''}}</span>
      </div>
    </div>
    <div class="mb-4 d-block mr-4 ml-4">
      <b-form-input placeholder="Быстрый поиск" v-model="searchField"/>
    </div>
    <section class="favorite-companies__list p-4">
      <div class="favorite-company mb-4 flex" v-for="item in validList">
        <div class="favorite-company__img"><img src="" alt=""></div>
        <div class="favorite-company__info">
          <router-link to="#" class="favorite-company__name m-0">{{item.name}}</router-link>
          <p class="favorite-company__category text-secondary m-0">{{item.category}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { companiesList } from '../../../assets/localData'
  export default {
    name: "FavoriteCompanies",
    data: () => ({
      searchField: '',
      tabs: [
        {type: 'online', label: 'Онлайн'},
        {type: 'offline', label: 'Оффлайн'}
      ],
      currentTab: {},
      companiesList: companiesList
    }),
    computed: {
      validList() {
        let validList = this.companiesList.filter(el => el.type === this.currentTab.type)
        if (this.searchField !== '') {
          validList = validList.filter(el => {
            return el.name.toLowerCase().indexOf(this.searchField.toLowerCase()) !== -1
          })
        }
        return validList
      }
    },
    beforeMount() {
      if (sessionStorage.getItem('currentRightPanelCompanyTypeTab') && +sessionStorage.getItem('currentRightPanelCompanyTypeTab') !== -1 ) {
        this.currentTab = this.tabs[+sessionStorage.getItem('currentRightPanelCompanyTypeTab')]
      } else {
        this.currentTab = this.tabs[0]
      }
    },
    methods: {
      setCurrentTab(tab) {
        this.currentTab = tab
        sessionStorage.setItem('currentRightPanelCompanyTypeTab', this.tabs.indexOf(tab))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .favorite-companies {
    &-body {
      display: flex;
      flex-direction: column;
      height: calc(100% - 4em);
    }
    &__title {
      font-size: 1.2em;
    }
    &__tabs {
      a.active {
        color: $textColor;
        text-decoration: none!important;
        cursor: default;
      }
    }
    &__list {
      flex-grow: 1;
      overflow: scroll;
    }
  }
  .favorite-company {
    &__img {
      width: 3em;
      min-width: 3em;
      height: 3em;
      border-radius: 50%;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
      margin-right: 1em;
      padding: 3px;
      background-color: #fff;
    }
    &__name {
      color: $textColor;
      &:hover {
        color: $primary;
        text-decoration: none;
      }
    }
    &__category {
      font-size: .9em;
    }
  }
  .add-favorite-company {
    margin-left: auto;
    cursor: pointer;
  }
</style>