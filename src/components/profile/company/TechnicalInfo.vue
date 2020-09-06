<template>
  <form @submit.prevent="submitForm" class="private-info">
    <b-row class="mb-4">
      <b-col cols="4">
        <b-form-input class="private-info__input" placeholder="Название компании" size="lg"/>
        <b-form-input class="private-info__input" title="Синонимы для поиска на сайте" placeholder="Синонимы для поиска на сайте" size="lg"/>
        <multiselect
            class="w-100 mb-4"
            v-model="currentCategories"
            :options="companyCategories"
            :multiple="true"
            selectedLabel="✔"
            placeholder="Список категорий"
        />
        <multiselect
            class="w-100 mb-4"
            v-model="companyFormat"
            :options="companyFormats"
            selectedLabel="✔"
            placeholder="Формат заведения"
        />
        <multiselect
            class="w-100 mb-0"
            v-model="collabStatus"
            :options="collabStatuses"
            selectedLabel="✔"
            placeholder="Статус сотрудничества"
        />
      </b-col>
      <b-col cols="8">
        <b-row>
          <b-col>
            <multiselect
                class="w-100 mb-4"
                v-model="loyaltyProgramType"
                :options="loyaltyProgramTypes"
                selectedLabel="✔"
                placeholder="Программа лояльности"
            />
            <multiselect
                class="w-100 mb-4"
                v-model="aggregator"
                :options="aggregators"
                selectedLabel="✔"
                placeholder="Агрегатор"
            />
          </b-col>
          <b-col>
            <b-row class="mb-4">
              <b-col cols="6">
                <multiselect
                    class="w-100 mb-0"
                    v-model="currency"
                    :options="currencies"
                    selectedLabel="✔"
                    placeholder="Валюта"
                />
              </b-col>
              <b-col class="pl-0" cols="6">
                <div class="private-info__input h-100 mb-0 flex ai-c jc-sb">
                  Кэшбэк:
                  <my-switcher is-boolean size="small" v-model="cashback" class="ml-3"></my-switcher>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-4">
              <b-col cols="6">
                <b-form-input class="private-info__input mb-0" placeholder="Коэф.: 10.3%" disabled size="lg"/>
              </b-col>
              <b-col class="pl-0" cols="6">
                <multiselect
                    class="w-100 mb-0 multiselect_small"
                    v-model="cardTemplate"
                    :options="cardTemplates"
                    selectedLabel="✔"
                    placeholder="Шаблон"
                />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <div class="inputs__field mb-4">
          <b-row>
            <b-col>
              <p>Идентификатор: 9900100</p>
              <p>Внешний идентификатор: 5567</p>
              <p>Символьный код: 677993</p>
            </b-col>
            <b-col>
              <p class="flex ai-c jc-sb">
                Холд:
                <my-switcher is-boolean size="extra-small" v-model="hold" class="ml-3"></my-switcher>
              </p>
              <p class="flex ai-c jc-sb">
                Активность:
                <my-switcher is-boolean size="extra-small" v-model="activity" class="ml-3"></my-switcher>
              </p>
              <p class="flex ai-c jc-sb">
                Расширение:
                <my-switcher is-boolean size="extra-small" v-model="extension" class="ml-3"></my-switcher>
              </p>
            </b-col>
          </b-row>
        </div>
        <p class="registration__date__p">Дата регистрации аккаунта: ДД/ММ/ГГ</p>
      </b-col>
    </b-row>
    <submit-buttons form-submit/>
  </form>
</template>

<script>
  import moment from 'moment'
  import {
    companyCategories,
    companyFormats,
    collabStatuses,
    loyaltyProgramTypes,
    aggregators, currencies, cardTemplates
  } from '../../../assets/localData'
  export default {
    name: "PrivateInfo",
    data: () => ({
      date: null,
      currentCategories: [],
      companyFormat: null,
      collabStatus: null,
      loyaltyProgramType: null,
      aggregator: null,
      currency: null,
      cashback: false,
      cardTemplate: null,
      hold: true,
      activity: true,
      extension: true,
      collabStatuses,
      companyCategories,
      companyFormats,
      loyaltyProgramTypes,
      aggregators,
      currencies,
      cardTemplates
    }),
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
      margin-bottom: 1.5rem;
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
    .registration__date__p {
      line-height: 42.5px;
      margin-bottom: 0;
    }
  }
  .inputs__field {
    width: 100%;
    padding: .5rem 1.25rem;
    p {
      margin: .3rem 0;
      line-height: 24px;
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
  .multiselect {
    margin-bottom: 1em;
  }
</style>