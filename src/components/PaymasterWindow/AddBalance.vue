<template>
  <div>
    <b-form-input onkeyup="this.value = this.value.replace(/[^\d]/g,'');" class="paymaster-sale__input mb-4" placeholder="Сумма пополнения" size="lg"/>
    <my-button @click="" class="paymaster-sale__btn" color="primary" shadow type="squared">
      Отправить код
    </my-button>
  </div>
</template>

<script>
  import { ModelListSelect } from 'vue-search-select'
  import 'vue-search-select/dist/VueSearchSelect.css'
  import {clientsDatabase} from "../../assets/localData";
  export default {
    name: "AddBalance",
    components: {
      ModelListSelect
    },
    data: () => ({
      currentId: null,
      tarif: null,
      clientsDatabase, // Локальная база данных клиентов
      tarifs: [
        'Простой',
        'X2',
        'Индивидуальный',
      ]
    }),
    watch: {
      currentId() { // При выборе карты запрашиваем информацию по владельцу карты
        this.$emit('selectById', this.currentId)
      }
    }
  }
</script>

<style lang="scss">
  .tarif-select__input, .paymaster-sale__input, .paymaster-sale__btn {
    max-width: 25rem;
    width: 25rem;
  }
</style>