<template>
  <div class="clients">
    <form @submit.prevent="searchClientByName" class="clients-search mb-5">
      <b-form-input class="clients-search__input" placeholder="Поиск по имени, телефону, номеру карты или e-mail " v-model="searchField" size="lg"/>
      <button type="submit" class="clients-search__btn"><font-awesome-icon :icon="['fas', 'search']"/></button>
    </form>
    <clients-filter class="mb-5"/>
    <clients-list :clients-list="currentClientsList"/>
  </div>
</template>

<script>
  import ClientsFilter from "../components/clients/ClientsFilter";
  import ClientsList from "../components/clients/ClientsList";
  import {clientsDatabase} from "../assets/localData";
  export default {
    name: "Clients",
    components: {
      ClientsFilter,
      ClientsList
    },
    data: () => ({
      searchField: '',
      clientsDatabase,
      currentClientsList: []
    }),
    methods: {
      searchClientByName() { // Поиск клиента по имени, емейлу, телефону или номеру карты
        const clients = []
        if (!this.searchField.replace(/\s/g, '')) {
          this.currentClientsList = this.clientsDatabase
          return 0
        }
        this.clientsDatabase.forEach(client => {
          if (client.name.toLowerCase().includes(this.searchField.toLowerCase())) {
            clients.push(client)
          }
          else if (this.searchField.replace(/[^\d]/g, '') && client.tel.replace(/[^\d]/g, '').includes(this.searchField.replace(/[^\d]/g, ''))) {
            clients.push(client)
          }
          else if (client.email.toLowerCase().includes(this.searchField.toLowerCase())) {
            clients.push(client)
          }
          else if (this.searchField.replace(/[^\d]/g, '') && client.cards.find(el => el.number.replace(/[^\d]/g, '').includes(this.searchField.replace(/[^\d]/g, '')))) {
            clients.push(client)
          }
        })
        this.currentClientsList = clients
      }
    },
    mounted() {
      this.currentClientsList = this.clientsDatabase
    }
  }
</script>

<style lang="scss" scoped>
  .clients {
    &-search {
      position: relative;
      width: 520px;
      &__input {
        border-radius: calc(.75em + .5rem + 1px);
        border: none;
        box-shadow: 0 9px 20px 1px rgba(0, 0, 0, 0.14);
        background-color: #fff;
      }
      &__btn {
        border: none;
        position: absolute;
        left: auto;
        right: 0;
        top: 0;
        font-size: 1.25rem;
        height: calc(1.5em + 1rem + 2px);
        width: calc(1.5em + 1rem + 2px);
        color: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $primary;
      }
    }
  }
</style>