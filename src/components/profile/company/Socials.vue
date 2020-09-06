<template>
  <form @submit.prevent="submitForm" class="contacts__wrap flex fd-c">
    <b-row>
      <b-col cols="3">
        <h5 class="mb-3">Вконтакте:</h5>
        <b-form-input class="contacts__input" placeholder="Адрес страницы" size="lg"/>
      </b-col>
      <b-col cols="3">
        <h5 class="mb-3">Instagram:</h5>
        <b-form-input class="contacts__input" placeholder="Адрес страницы" size="lg"/>
      </b-col>
      <b-col cols="3">
        <h5 class="mb-3">FaceBook:</h5>
        <b-form-input class="contacts__input" placeholder="Адрес страницы" size="lg"/>
      </b-col>
      <b-col cols="3">
        <h5 class="mb-3">YouTube:</h5>
        <b-form-input class="contacts__input" placeholder="Адрес страницы" size="lg"/>
      </b-col>
    </b-row>
    <submit-buttons form-submit/>
  </form>
</template>

<script>
  export default {
    name: "PrivateInfo",
    methods: {
      submitForm() {
        this.$bvToast.toast(`Данные успешно обновлены`, {
          variant: 'success',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contacts {
    &__wrap {
      height: 100%;
      h4 {
        margin-bottom: 1em;
      }
    }
    &__input {
      width: 100%;
      margin-bottom: 1em;
    }
  }
</style>