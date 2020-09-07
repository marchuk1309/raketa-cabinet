<template>
  <section class="sidebar" :class="{closed: isClosed}">
    <div @click="isClosed = !isClosed" class="sidebar-burger">
      <span></span><span></span><span></span>
    </div>
    <div class="sidebar-logo">
      <router-link to="/" @click="isClosed = true" class="logo d-block"></router-link>
    </div>
    <div class="sidebar-menu">
      <div class="p-4" :class="{'collapse-item': item.children, 'has-divider': item.hasDivider}" :key="item.title" v-for="item in currentMenu">
        <a @click.prevent="getTo(item.linkName)" v-if="!item.children" class="flex lh-1 sidebar-link" :class="{active: $route.name === item.linkName}"><font-awesome-icon class="mr-2" v-if="item.icon" :icon="['fas', item.icon]"/>{{item.title}}</a>
        <a v-else class="flex lh-1 collapse-toggler" @click.prevent="$root.$emit('bv::toggle::collapse', item.collapseId)"><font-awesome-icon class="mr-2" v-if="item.icon" :icon="['fas', item.icon]"/>{{item.title}}<font-awesome-icon class="ml-a" :icon="item.collapseState ? ['fas', 'caret-down'] : ['fas', 'caret-right']"/></a>
        <b-collapse @show="item.collapseState = true" @hide="item.collapseState = false" class="pt-3" v-if="item.children" :id="item.collapseId">
          <a href="" class="flex sidebar-link collapse-child" @click.prevent="getTo(child.name)" :class="{active: $route.name === child.name}" :key="child.title" v-for="child in item.children">{{child.title}}</a>
        </b-collapse>
      </div>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Sidebar",
    data: () => ({
      isClosed: true,
      userMenuList: [
        {
          title: 'Мои карты',
          collapseId: 'myCards',
          collapseState: false,
          icon: 'credit-card',
          children: [
            {title: 'Все карты', name: 'MyCards'},
            {title: 'Карта 1', name: 'TransAdmission'},
            {title: 'Карта 2', name: 'TransWriteOff'}
          ]
        },
        {
          title: 'Транзакции',
          collapseId: 'transactions',
          collapseState: false,
          icon: 'history',
          children: [
            {title: 'Начисление', name: 'TransAdmission'},
            {title: 'Списание', name: 'TransWriteOff'}
          ]
        },
        {
          title: 'Поддержка',
          icon: 'life-ring',
          linkName: 'profileSupport',
          hasDivider: true
        },
        {
          title: 'Акции',
          icon: 'gift',
          linkName: ''
        },
        {
          title: 'Избранное',
          icon: 'star',
          linkName: ''
        },
        {
          title: 'Мои отзывы',
          icon: 'comments',
          linkName: ''
        }
      ],
      companyMenuList: [
        {
          title: 'Сводка',
          icon: 'comments',
          linkName: ''
        },
        {
          title: 'Окно кассира',
          icon: 'credit-card',
          linkName: 'PaymasterWindow'
        },
        {
          title: 'Транзакции',
          collapseId: 'transactions',
          collapseState: false,
          icon: 'history',
          children: [
            {title: 'Начисление', name: 'TransAdmission'},
            {title: 'Списание', name: 'TransWriteOff'}
          ]
        },
        {
          title: 'Клиенты',
          icon: 'user-circle',
          linkName: 'Clients'
        },
        {
          title: 'Акты и счета',
          icon: 'file-alt',
          linkName: ''
        },
        {
          title: 'Управление',
          collapseId: 'controls',
          collapseState: false,
          icon: 'sliders-h',
          children: [
            {title: 'Тарифы', name: ''},
            {title: 'Акции', name: ''},
            {title: 'Медиа блок', name: ''},
            {title: 'Сотрудники', name: ''}
          ]
        },
        {
          title: 'Услуги Raketa',
          icon: 'rocket',
          linkName: ''
        },
        {
          title: 'Поддержка',
          icon: 'life-ring',
          linkName: 'companySupport'
        },
        {
          title: 'Отзывы заведения',
          icon: 'comments',
          linkName: ''
        },
      ]
    }),
    methods: {
      getTo(name) {
        this.isClosed = true
        this.$router.push({name: name})
      }
    },
    computed: {
      ...mapGetters(['userStatus']),
      currentMenu() {
        switch (this.userStatus) {
          case "user":
            return this.userMenuList
          case "company":
            return this.companyMenuList
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .collapse-item {
    background: #171820;
  }
  .sidebar {
    color: #ffffff;
    background-color: #23252f;
    position: fixed;
    left: 0;
    top: 0;
    min-height: 100vh;
    height: 100%;
    z-index: 11;
    width: 14em;
    transition: .5s;
    &-burger {
      margin-left: auto;
      margin-right: auto;
      margin-top: 2em;
      width: 40px;
      height: 28px;
      position: relative;
      cursor: pointer;
      span {
        position: absolute;
        display: block;
        width: 100%;
        height: 4px;
        background-color: #ffffff;
        border-radius: 2px;
        left: 0;
        transition: .5s;
        &:first-child {
          /*top: 0;*/
          transform: rotate(-45deg);
          top: calc(50% - 2px);
        }
        &:nth-child(2) {
          top: calc(50% - 2px);
          visibility: hidden;
          opacity: 0;
          transition: .2s;
        }
        &:last-child {
          top: calc(50% - 2px);
          transform: rotate(45deg);
        }
      }
    }
    &-link {
      color: #ffffff;
      padding: 0;
      cursor: pointer;
      &.collapse-child {
        padding: .5em 0;
      }
      &:hover {
        text-decoration: none;
        color: $primary;
      }
      &.active {
        color: $primary;
      }
    }
    &-logo {
      margin: 1em 2em;
      width: 100%;
      height: 4em;
      .logo {
        height: 100%;
        width: 100%;
        background-image: url(../../assets/images/logo_white.png);
        background-size: contain;
        background-position: left;
        background-repeat: no-repeat;
      }
    }
    &-menu, .sidebar-logo {
      position: relative;
      transition: .5s;
      left: 0;
    }
    &.closed {
      width: 4em;
      .sidebar-burger {
        span {
          transform: none!important;
          &:first-child {
            top: 0;
          }
          &:nth-child(2) {
            display: block;
            visibility: visible;
            opacity: 1;
          }
          &:last-child {
            top: calc(100% - 4px);
          }
        }
      }
      .sidebar-menu, .sidebar-logo {
        left: -20em;
      }
    }
    &-menu {
      > .has-divider {
        margin-bottom: 20px;
      }
    }
  }
  .collapse-toggler {
    cursor: pointer;
    &:hover {
      color: $primary;
    }
  }
</style>