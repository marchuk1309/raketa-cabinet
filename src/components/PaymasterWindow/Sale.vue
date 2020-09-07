<template>
  <div>
    <b-form-input v-model="checkSum" onkeyup="this.value = this.value.replace(/[^\d]/g,'');" class="paymaster-sale__input mb-4" placeholder="Сумма чека" size="lg"/>
    <b-form-input v-model="writeOffSum" onkeyup="this.value = this.value.replace(/[^\d]/g,'');" class="paymaster-sale__input mb-4" placeholder="Сумма списания" size="lg"/>
    <multiselect
        class="tarif-select__input mb-4"
        v-model="tarif"
        :options="tarifs"
        selectedLabel="✔"
        placeholder="Тариф"
    />
    <masked-input ref="btnInput" v-model="code" :disabled="blockCodeInput" v-show="codeWaiting" class="button__input" mask="1111" placeholder="____" />
    <my-button v-if="!codeWaiting" @click="submitOperation" class="paymaster-sale__btn" color="primary" shadow type="squared">
      {{buttonLabel}}
    </my-button>
  </div>
</template>

<script>
  import { ModelListSelect } from 'vue-search-select'
  import 'vue-search-select/dist/VueSearchSelect.css'
  import {clientsDatabase} from "../../assets/localData";
  export default {
    name: "Sale",
    components: {
      ModelListSelect
    },
    data: () => ({
      blockCodeInput: false,
      tarif: null,
      writeOffSum: null,
      checkSum: null,
      codeWaiting: false,
      code: null,
      tarifs: [
        'Простой',
        'X2',
        'Индивидуальный',
      ]
    }),
    computed: {
      buttonLabel() {
        return this.writeOffSum ? 'Отправить код' : 'Провести продажу'
      }
    },
    watch: {
      code() {
        if (this.code.replace(/[^\d]/g, '').length === 4) {
          this.submitOperation()
        }
      }
    },
    methods: {
      submitOperation() {
        if (this.writeOffSum && !this.codeWaiting) {
          this.codeWaiting = true
          console.log(this.$refs.btnInput.$el)
          this.$nextTick(() => this.$refs.btnInput.$el.focus())
          /*
          TODO: Отправка кода подтверждения
          * */
        }
        else if (this.codeWaiting && this.code.length === 4) {
          this.blockCodeInput = true
          /*
          TODO: Валидация введенного кода подтверждения
          */
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .tarif-select__input, .paymaster-sale__input, .paymaster-sale__btn, .button__input {
    max-width: 25rem;
    width: 25rem;
  }
  .button__input {
    padding: 0 1em;
    background: none;
    border: none;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $primaryGrag;
    color: #ffffff;
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: 5px;
    border-radius: 3px;
  }
</style>