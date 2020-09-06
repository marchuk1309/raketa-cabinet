<template>
  <form @submit.prevent="submitForm" class="contacts__wrap flex fd-c">
    <b-row class="mb-4">
      <b-col cols="3">
        <h5 class="mb-3">Контакты:</h5>
        <masked-input class="contacts__input form-control form-control-lg" mask="\+\7 (111) 111 11 11" placeholder="+7 (XXX) XXX XX XX" />
        <b-form-input class="contacts__input" placeholder="Сайт компании" size="lg"/>
        <b-form-input class="contacts__input" placeholder="E-mail" size="lg"/>
      </b-col>
      <b-col cols="6">
        <h5 class="mb-3">Адрес:</h5>
        <b-row>
          <b-col>
            <b-form-input class="contacts__input" placeholder="Страна" size="lg"/>
            <b-form-input class="contacts__input" placeholder="Город" size="lg"/>
            <b-form-input class="contacts__input" placeholder="Улица" size="lg"/>
          </b-col>
          <b-col>
            <b-form-input class="contacts__input" placeholder="Дом" size="lg"/>
            <b-form-input class="contacts__input" placeholder="Строение" size="lg"/>
            <b-form-input class="contacts__input" placeholder="Офис" size="lg"/>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3">
        <h5 class="mb-3">Часы работы:</h5>
        <div v-for="day in days" :key="day.name" class="work-times__row">
          <my-checkbox v-model="day.isOn"/>
          <span class="work-times__day-label">{{day.name}}</span>
          <span>c </span>
          <masked-input mask="11\:11" class="work-times__input form-control form-control-sm"/>
          <span>по </span>
          <masked-input mask="11\:11" class="work-times__input form-control form-control-sm"/>
        </div>
      </b-col>
    </b-row>
    <submit-buttons form-submit/>
  </form>
</template>

<script>
  export default {
    name: "PrivateInfo",
    data: ()=> ({
      days: [
        {name: 'Пн.', isOn: true},
        {name: 'Вт.', isOn: false},
        {name: 'Ср.', isOn: false},
        {name: 'Чт.', isOn: false},
        {name: 'Пт.', isOn: false},
        {name: 'Сб.', isOn: false},
        {name: 'Вс.', isOn: false},
      ]
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
  .contacts {
    &__wrap {
      height: 100%;
      h4 {
        margin-bottom: 1em;
      }
    }
    &__input {
      width: 100%;
      margin-bottom: 1.75rem;
    }
  }
  .work-times {
    &__row{
      font-size: 14px;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 5px;
    }
    &__input {
      height: 20px;
      width: 40px;
      padding-left: 5px;
      padding-right: 5px;
      margin-right: 10px;
      margin-left: 5px;
    }
    &__day-label {
      width: 30px;
      min-width: 25px;
      margin-right: 10px;
    }
    &__checkbox {
      position: absolute;
      left: 0;
      top: calc(50% - 8px);
      width: 16px;
      height: 16px;
      border-radius: 3px;
      border: 1px solid #ced4da;
      z-index: 1;
      &::after {
        content: '';
        position: absolute;
        left: 2px;
        top: 2px;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        z-index: 1;
      }
      &--input {
        width: 15px;
        height: 15px;
        opacity: 0;
        z-index: 2;
        cursor: pointer;
        margin-right: 5px;
        &:checked {
          & + .work-times__checkbox::after {
            background-color: $primary;
          }
        }
      }
    }
  }
</style>