<template>
  <div>
    <b-form-input onkeyup="this.value = this.value.replace(/[^\d]/g,'');" class="paymaster-sale__input mb-4" placeholder="Сумма пополнения" size="lg"/>
    <masked-input ref="btnInput" v-model="code" :disabled="blockCodeInput" v-show="codeWaiting" class="button__input" mask="1111" placeholder="____" />
    <my-button v-if="!codeWaiting" @click="submitOperation" class="paymaster-sale__btn" color="primary" shadow type="squared">
      Отправить код
    </my-button>
  </div>
</template>

<script>
  export default {
    name: "AddBalance",
    data: () => ({
      codeWaiting: false,
      blockCodeInput: false,
      code: null
    }),
    methods: {
      submitOperation() {
        if (!this.codeWaiting) {
          this.codeWaiting = true
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
    },
    watch: {
      code() {
        if (this.code.replace(/[^\d]/g, '').length === 4) {
          this.submitOperation()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .paymaster-sale__input, .paymaster-sale__btn, .button__input {
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