<template>
  <div>
    <p class="big-text">Начните вводить ФИО и выберите <br>клиента  из списка:</p>
    <model-list-select
        class="name-search__input form-control form-control-lg"
        :list="clientsDatabase"
        option-text="name"
        option-value="id"
        v-model="currentId"
        placeholder="ФИО клиента"
    />
  </div>
</template>

<script>
  import { ModelListSelect } from 'vue-search-select'
  import 'vue-search-select/dist/VueSearchSelect.css'
  import {clientsDatabase} from "../../assets/localData";
  export default {
    name: "NameSearch",
    components: {
      ModelListSelect
    },
    data: () => ({
      currentId: null,
      clientsDatabase, // Локальная база данных клиентов
    }),
    watch: {
      currentId() { // При выборе карты запрашиваем информацию по владельцу карты
        this.$emit('selectClient', this.clientsDatabase.find(el => el.id === this.currentId))
      }
    }
  }
</script>

<style lang="scss">
  .name-search__input {
    max-width: 25rem;
    background: #f7fafc!important;
    padding: 0.5rem 1rem!important;
    font-size: 1.25rem!important;
    line-height: 1.5!important;
    border-radius: 0.3rem!important;
    > .dropdown.icon {
      padding: 0.5rem 1rem!important;
      font-size: 1.25rem!important;
      line-height: 1.5!important;
    }
    .menu > .item {
      font-size: 1.25rem!important;
    }
  }
</style>