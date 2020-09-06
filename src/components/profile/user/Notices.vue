<template>
  <form class="notices__wrap flex fd-c" @submit.prevent="submitForm">
    <div class="notices__list">
      <div v-for="notice in notices" class="notices__row flex ai-c">
        <span>{{notice[0]}}</span>
        <my-switcher size="small" is-boolean v-model="notice[1]"/>
      </div>
    </div>
    <submit-buttons form-submit />
  </form>
</template>

<script>
  export default {
    name: "Notices",
    data: () => ({
      notices: {
        addCashback: ['Начисление кэшбэка', false],
        outCashback: ['Списание кэшбэка', true],
        discount: ['Акции от заведения', false],
        news: ['Новости от Raketa', false]
      }
    }),
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
  .notices__wrap {
    height: 100%;
  }
 .notices__row {
   margin-bottom: 1.5em;
   width: 17em;
   justify-content: space-between;
 }
</style>