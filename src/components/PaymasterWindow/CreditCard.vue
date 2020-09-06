<template>
  <div>
    <p class="big-text">Введите номер карты полностью <br>или последние 4 цифры:
    </p>
    <model-list-select
        class="card-search__input form-control form-control-lg"
        :list="cardsList"
        option-text="cardNumber"
        option-value="clientId"
        v-model="currentClient"
        placeholder="Номер карты"
        :filterPredicate="cardFiltering"
    />
  </div>
</template>

<script>
  import { ModelListSelect } from 'vue-search-select'
  import 'vue-search-select/dist/VueSearchSelect.css'
  import { clientsDatabase } from '../../assets/localData'
  import {mapGetters} from "vuex";
  export default {
    name: "CreditCard",
    components: {
      ModelListSelect
    },
    data: () => ({
      currentClient: null,
      clientsDatabase // Локальная база данных клиентов
    }),
    methods: {
      cardFiltering(text, inputText) { // Обрабатываем поиск по номерам карт (Сравниваем только цифры)
        const newText = text.replace(/[^\d]/g, '')
        const newInputText = inputText.replace(/[^\d]/g, '')
        return newText.includes(newInputText)
      }
    },
    watch: {
      currentClient() { // При выборе карты запрашиваем информацию по владельцу карты
        this.$emit('selectClient', this.clientsDatabase.find(el => el.id === this.currentClient))
      }
    },
    computed: {
      cardsList() { // Формируем с базы данных клиентов массив с ID клиента и номерами карт
        const cards = []
        this.clientsDatabase.forEach(el => {
          el.cards.forEach(card => {
            cards.push({clientId: el.id, cardNumber: card.number})
          })
        })
        return cards
      }
    }
  }
</script>

<style lang="scss">
  .card-search__input {
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