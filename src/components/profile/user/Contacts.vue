<template>
  <form @submit.prevent="submitForm" class="contacts__wrap flex fd-c">
    <b-row>
      <b-col cols="6">
        <h5 class="mb-3">Контакты</h5>
        <masked-input class="contacts__input form-control form-control-lg" mask="\+\7 (111) 111 11 11" placeholder="+7 (XXX) XXX XX XX" />
        <b-form-input class="contacts__input" placeholder="E-mail" size="lg"/>
      </b-col>
      <b-col cols="6">
        <h5 class="mb-3">Соцсети</h5>
        <b-form-input class="contacts__input" placeholder="Instagram" size="lg"/>
        <b-form-input class="contacts__input" placeholder="Facebook" size="lg"/>
        <b-form-input class="contacts__input" placeholder="ВКонтакте" size="lg"/>
        <b-form-input class="contacts__input" placeholder="YouTube" size="lg"/>
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