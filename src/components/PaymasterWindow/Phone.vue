<template>
  <div>
    <p class="big-text">Введите номер телефона, <br> указанный в профиле клиента</p>
    <vue-tel-input
        placeholder="Номер телефона"
        wrapperClasses="phone-search__input form-control form-control-lg"
        v-model="phone"
        @validate="searchClient"
    />
  </div>
</template>

<script>
  import { VueTelInput } from 'vue-tel-input'
  import {clientsDatabase} from "../../assets/localData";
  export default {
    name: "Phone",
    components: {
      VueTelInput
    },
    data: () => ({
      phone: null,
      clientsDatabase
    }),
    methods: {
      searchClient() {
        if (this.phone) {
          console.log(this.phone)
          const phone = this.phone.replace(/[^\d]/g, '')
          console.log(phone)
          const client = this.clientsDatabase.find(el => phone === el.tel.replace(/[^\d]/g, ''))
          if (client) {
            this.$emit('selectClient', client)
          }
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .phone-search__input {
    max-width: 25rem;
  }
</style>
<style lang="scss">
  .phone-search__input .vti__input {
    background-color: transparent;
  }
</style>