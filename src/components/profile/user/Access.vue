<template>
  <form @submit.prevent="submitForm" class="access flex jc-sb">
    <div class="access__inputs">
      <b-form-input class="access__input" placeholder="Ваш логин" size="lg"/>
      <b-form-input class="access__input" type="password" placeholder="Введите новый пароль" size="lg"/>
      <b-form-input class="access__input" type="password" placeholder="Повторите новый пароль" size="lg"/>
    </div>
    <div class="access__descript">
      <p>Последняя авторизация: </p>
      <p>ДД/ММ/ГГ, ЧЧ:ММ</p>
      <p>Страна, область, город</p>
      <p>Устройство, OS</p>
    </div>
    <submit-buttons form-submit />
  </form>
</template>

<script>
  export default {
    name: "Acces",
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
  .access {
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    &__inputs {
      width: 48%;
    }
    &__input {
      width: 100%;
      margin-bottom: 1em;
    }
    &__descript {
      width: 48%;
      p {
        margin-bottom: .25em;
        &:not(:first-child) {
          color: #a9a9a9;
        }
      }
    }
    &__submit-buttons {
      width: 100%;
      margin-top: auto;
    }
    @media (max-width: 1024px) {
      &__inputs, &__descript {
        width: 100%;
      }
    }
  }
</style>