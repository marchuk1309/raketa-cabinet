<template>
  <div>
    <p class="big-text">Введите номер телефона</p>
    <vue-tel-input
        placeholder="Номер телефона"
        wrapperClasses="phone-search__input form-control form-control-lg mb-4"
        v-model="newCard.phone"
    />
    <multiselect
        class="tarif-select__input mb-4"
        v-model="newCard.tarif"
        :options="tarifs"
        selectedLabel="✔"
        placeholder="Выберите тариф"
    />
    <my-button size="large">Зарегистрировать</my-button>
  </div>
</template>

<script>
  import { VueTelInput } from 'vue-tel-input'
  import {clientsDatabase} from "../../assets/localData";
  export default {
    name: "RegCard",
    components: {
      VueTelInput
    },
    data: () => ({
      clientsDatabase,
      newCard: {
        phone: null,
        tarif: null
      },
      tarifs: [
        'Простой',
        'X2',
        'Индивидуальный',
      ]
    }),
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  .phone-search__input, .tarif-select__input {
    max-width: 25rem;
  }

</style>
<style lang="scss">
  .phone-search__input .vti__input {
    background-color: transparent;
  }
</style>