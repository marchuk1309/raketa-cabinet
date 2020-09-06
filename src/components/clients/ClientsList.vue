<template>
  <div class="clients-list__wrap">
    <div class="clients-list__nav d-flex ai-c">
      <my-checkbox v-model="selectAll"/>
      <span class="mr-5">Выбрать все</span>
      <b-dropdown variant="text" text="Действие" class="clients-list__nav-dropdown">
        <b-dropdown-item>
          <font-awesome-icon :icon="['fas', 'comment']"/>
          Отправить СМС
        </b-dropdown-item>
        <b-dropdown-item>
          <font-awesome-icon :icon="['fas', 'bell']"/>
          Отправить Push
        </b-dropdown-item>
        <b-dropdown-item>
          <font-awesome-icon :icon="['fas', 'rocket']"/>
          Сослать на Марс
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="clients-list">
      <div
          @click="addToSelected(client.id)"
          class="client"
          :class="{active: selectedList.includes(client.id)}"
          v-for="client in clientsList"
          :key="client.id"
      >
        <div class="d-flex ai-c">
          <div class="client-avatar">
            <img v-if="client.avatar" :src="client.avatar" alt="">
          </div>
          <div class="client-name">{{client.name}}</div>
        </div>
        <div class="check">
          <font-awesome-icon :icon="['fas', 'check']"/>
        </div>
        <div class="client-card-number">{{client.cards[0].number}}</div>
        <div class="client-phone">{{client.tel}}</div>
        <div class="client-email">{{client.email}}</div>
        <div class="d-flex ai-c">
          <my-button class="mr-4" size="medium">Транзакции</my-button>
          <a href=""><font-awesome-icon size="lg" :icon="['fas', 'file']"/></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {clientsDatabase} from "../../assets/localData";

  export default {
    name: "ClientsList",
    props: [
      'clientsList'
    ],
    data: () => ({
      selectAll: false,
      clientsDatabase,
      selectedList: []
    }),
    watch: {
      selectAll() {
        if (this.selectAll) {
          this.clientsDatabase.forEach(el => {
            if (!this.selectedList.includes(el.id)) {
              this.selectedList.push(el.id)
            }
          })
        }
        else {
          this.selectedList = []
        }
      }
    },
    methods: {
      addToSelected(id) {
        if (this.selectedList.find(el => el === id)) {
          this.selectedList = this.selectedList.filter(el => el !== id)
        }
        else {
          this.selectedList.push(id)
        }
      },
    }
  }
</script>

<style lang="scss">
  .clients-list {
    &__nav {
      &-dropdown {
        .dropdown-toggle {
          outline: none!important;
          &:hover {
            color: $primary;
          }
        }
        .dropdown-menu {
          padding: 0!important;
        }
        .dropdown-item {
          padding: 10px;
          svg {
            width: 30px;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .clients-list {
    margin-top: 2rem;
  }
  .client {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.09);
    background-color: #fff;
    padding: 20px 45px;
    margin-bottom: 16px;
    position: relative;
    &-avatar {
      width: 54px;
      min-width: 54px;
      height: 54px;
      border: 3px solid #eeeeee;
      border-radius: 50%;
      margin-right: 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .check {
      position: absolute;
      left: 0;
      top: 0;
      width: 30px;
      height: 100%;
      background-color: $primary;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
    }
    &.active {
      .check {
        opacity: 1;
        visibility: visible;
      }
      .client-avatar {
        border-color: $primary;
      }
    }
    &:not(.active) {
      .my-btn:not(:hover) {
        transition: 0s;
        background: #b1b1b1;
      }
      a:not(:hover) {
        color: #b1b1b1;
      }
    }
    > div {
      width: 20%;
      &:first-child {
        width: 24%;
      }
      &:last-child {
        width: 16%;
        justify-content: flex-end;
      }
    }
  }
</style>