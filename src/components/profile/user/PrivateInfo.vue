<template>
  <form @submit.prevent="submitForm" class="private-info">
    <b-row>
      <b-col cols="6">
        <b-form-input class="private-info__input" placeholder="Фамилия" size="lg"/>
        <b-form-input class="private-info__input" placeholder="Имя" size="lg"/>
        <b-form-input class="private-info__input" placeholder="Отчество" size="lg"/>
        <div class="private-info__input flex jc-sb">
          <div class="private-info__input small date-input">
            <date-picker
                value-type="date"
                placeholder="Дата рождения"
                :format="momentFormat"
                v-model="date"
            />
          </div>
          <b-form-input size="lg" class="private-info__input small" readonly :value="age"/>
        </div>
        <div class="private-info__input flex ai-c">
          Ваш пол:
          <my-switcher v-model="gender" val1="М" val2="Ж" class="ml-3"></my-switcher>
        </div>
      </b-col>
      <b-col cols="6">
        <b-form-input class="private-info__input" placeholder="Страна" size="lg"/>
        <b-form-input class="private-info__input" placeholder="Регион" size="lg"/>
        <b-form-input class="private-info__input" placeholder="Город" size="lg"/>
      </b-col>
    </b-row>
    <submit-buttons form-submit/>
  </form>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "PrivateInfo",
    data: () => ({
      date: null,
      gender: true,
      momentFormat: {
        // Date to String
        stringify: (date) => {
          return date ? moment(date).format('DD.MM.YYYY') : ''
        },
        // String to Date
        parse: (value) => {
          return value ? moment(value, 'DD.MM.YYYY').toDate() : null
        }
      },
    }),
    computed: {
      age() {
        if (!this.date) {
          return 0 + " лет"
        } else {
          const selectedDateStr = moment(this.date).format('DD.MM.YYYY')
          const selectedDate = {
            day: selectedDateStr.slice(0,2),
            month: selectedDateStr.slice(3,5),
            year: selectedDateStr.slice(6)
          }
          const nowStr = moment(new Date()).format('DD.MM.YYYY')
          const nowDate = {
            day: nowStr.slice(0,2),
            month: nowStr.slice(3,5),
            year: nowStr.slice(6)
          }
          let years = nowDate.year - selectedDate.year
          if (selectedDate.month > nowDate.month || (selectedDate.month === nowDate.month && selectedDate.day > nowDate.day)) {
            years -= 1
          }
          if (years % 10 === 1 && years !== 11) {
            return (years + ' год')
          }
          else if (years % 10 > 1 && years % 10 < 5 && (years > 20 || years < 10)) {
            return (years + ' года')
          }
          return years + ' лет'
        }
      }
    },
    methods: {
      submitForm() {
        console.log('submit')
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
  .private-info {
    height: 100%;
    &__inputs {
      width: 100%;
      flex-wrap: wrap;
      font-size: 1.25rem;
    }
    &__input {
      width: 100%;
      margin-bottom: 1.5em;
      &.small {
        width: 48%;
        margin-bottom: 0;
      }
      &.date-input {
        position: relative;
        .date-val {
          position: absolute;
          left: .9em;
          top: calc(50% - 0.7em);
        }
      }
    }
  }
</style>

<style lang="scss">
  .private-info .date-input .mx-datepicker{
    width: auto;
    input {
      height: 42.5px!important;
      background: #f7fafc;
      color: #495057;
      font-size: 1.25em;
      &::placeholder {
        color: #6c757d;
      }
    }
  }
</style>