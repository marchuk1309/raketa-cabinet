<template>
  <section class="main-layout">
    <sidebar></sidebar>
    <section class="body">
      <app-header></app-header>
      <b-breadcrumb class="breadcrumbs" v-if="breadcrumbs.length">

        <b-breadcrumb-item
            :disabled="$route.meta.title === 'Профиль'"
            :to="{name: 'profileSettings'}"
        >
          Профиль
        </b-breadcrumb-item>
        <b-breadcrumb-item
            v-if="$route.meta.title !== 'Профиль'"
            v-for="route in breadcrumbs"
            :to="{name: route.name}"
        >
          {{route.meta.title}}
        </b-breadcrumb-item>
      </b-breadcrumb>
      <div class="content">
        <div class="content-head flex ai-c jc-sb">
          <h2 v-if="!$route.meta.hideTitle" class="site-title">{{title}}</h2>
          <div v-if="siteContext" class="site-context">{{siteContext}}</div>
        </div>
        <router-view/>
      </div>
    </section>
    <right-panel v-if="userStatus === 'user'" />
  </section>
</template>

<script>

  import AppHeader from "../components/global/Header";
  import Sidebar from "../components/global/Sidebar";
  import RightPanel from "../components/global/RightPanel/index";
  import {mapGetters} from "vuex";
  export default {
    components: {
      Sidebar,
      AppHeader,
      RightPanel
    },
    computed: {
      ...mapGetters(['userStatus']),
      title() {return this.$store.state.siteTitle},
      siteContext() {return this.$store.state.siteContext},
      breadcrumbs() {
        const arr = []
        this.$route.matched.forEach(el => {
          if (el.meta.title) {
            arr.push(el)
          }
        })
        return arr
      }
    },
  }
</script>

<style lang="scss" scoped>
  .main-layout {
    background-color: $themeGray;
    min-height: 100vh;
    display: flex;
    position: relative;
  }
  .body {
    width: calc(100% - 4em);
    margin-left: 4em;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .content {
    max-width: 100%;
    width: calc(100% - 20em);
    padding: 1em 2em;
    flex-grow: 2;
    &-head {
      margin-bottom: .5em;
    }
    @media (max-width: 1600px) {
      width: 100%;
    }
  }
  .site-title {
    font-weight: 500;
    font-size: 2.4em;
    margin-bottom: .6em;
  }
  .site-context {
    color: #666;
  }
  .breadcrumbs {
    padding-left: 2em;
    background: #ffffff;
  }
</style>