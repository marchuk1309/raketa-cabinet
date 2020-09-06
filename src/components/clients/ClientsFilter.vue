<template>
  <div class="card filter">
    <p
        class="collapse-pointer"
        @click="filterOpened = !filterOpened"
        v-b-toggle.collapse-filter
    >
      Фильтр
      <font-awesome-icon v-if="filterOpened" :icon="['fas', 'caret-up']"/>
      <font-awesome-icon v-else :icon="['fas', 'caret-down']"/>
    </p>
    <b-collapse visible id="collapse-filter" class="mt-2">
      <b-row>
        <b-col>
          <model-list-select
              class="mb-4 name-search__input form-control form-control-lg"
              :list="companiesList"
              option-text="name"
              option-value="id"
              v-model="searchOptions.companyId"
              placeholder="Выбрать заведение"
          />
          <date-picker
              class="mr-3"
              value-type="date"
              placeholder="Начальная дата"
              :format="momentFormat"
              v-model="searchOptions.startDate"
          />
        </b-col>
        <b-col>
          <model-list-select
              class="mb-4 name-search__input form-control form-control-lg"
              :list="tarifs"
              v-model="searchOptions.tarif"
              placeholder="Выбрать тариф"
          />
          <date-picker
              value-type="date"
              placeholder="Конечная дата"
              :format="momentFormat"
              v-model="searchOptions.endDate"
          />
        </b-col>
        <b-col>
          <p class="text-center mb-2">Возраст клиента</p>
          <vue-slider
              v-model="searchOptions.clientAge"
              :min="0"
              :max="100"
              class="w-100 mb-3"
          />
          <p class="text-center mb-2">Баланс на карте</p>
          <vue-slider
              v-model="searchOptions.clientBalance"
              :min="0"
              :max="1000000"
              class="w-100"
          />
        </b-col>
        <b-col>
          <p>Пол</p>
          <div class="d-flex">
            <div class="sex-checkbox mr-3">
              <input type="checkbox" name="clientSex" :value="1" v-model="searchOptions.clientSex">
              <div class="male">
                <font-awesome-icon :icon="['fas', 'male']"/>
              </div>
            </div>
            <div class="sex-checkbox">
              <input type="checkbox" name="clientSex" :value="0" v-model="searchOptions.clientSex">
              <div class="female">
                <font-awesome-icon :icon="['fas', 'female']"/>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="filter-buttons flex ai-c mt-4">
        <my-button class="mr-2" @click="filtering">Применить</my-button>
        <my-button color="transparent" @click="clearFilter">Сбросить</my-button>
      </div>
    </b-collapse>
  </div>
</template>

<script>

  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'
  import { ModelListSelect } from 'vue-search-select'
  import 'vue-search-select/dist/VueSearchSelect.css'
  import moment from 'moment'
  import {companiesList, tarifs} from "../../assets/localData";
  export default {
    name: "ClientsFilter",
    data: () => ({
      searchOptions: {
        companyId: null,
        startDate: '',
        endDate: '',
        tarif: '',
        clientAge: [30, 70],
        clientBalance: [300000, 700000],
        clientSex: [],
      },
      tarifs,
      companiesList, // Локальная база данных клиентов
      filterOpened: true,
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
      sum: [0],
    }),
    computed: {
      cardList() {
        const list = [{value: null, text: 'Выберите карту'}]
        this.$store.getters.allCards.forEach((el, index, arr) => {
          list.push(el.number)
        })
        return list
      },
      maxSum() {
        return this.$store.getters['maxTransSum']
      },
    },
    methods: {
      filtering() {
        const settings = {
          cardNumber: this.currentCard,
          startDate: this.startDate === '' ? null : new Date(this.startDate),
          endDate: this.endDate === '' ? null : new Date(this.endDate),
          company: this.currentCompany,
          startSum: this.sum[0],
          endSum: this.sum[1]
        }
        this.$emit('filtering', settings)
      },
      clearFilter() {
        this.currentCard = null
        this.startDate = ''
        this.endDate = ''
        this.currentCompany = null
        this.sum = [0, this.maxSum]
        this.filtering()
      }
    },
    mounted() {
      if (this.$route.query.card) {
        this.currentCard = this.$store.getters.getCardById(+this.$route.query.card).number
      }
      this.sum.push(this.maxSum)
      this.filtering()
    },
    components: {
      VueSlider,
      ModelListSelect
    }
  }
</script>

<style lang="scss" scoped>
  .collapse-pointer {
    line-height: 1;
    cursor: pointer;
    width: fit-content;
  }
  .sex-checkbox {
    position: relative;
    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      &:checked + div {
        background-color: $primary;
        color: #ffffff;
      }
    }
    div {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #eeeeee;
      background-color: #f7fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      &.male {
        color: $primary;
      }
      &.female {
        color: #ff6fd1;
      }
    }
  }
</style>
<style lang="scss">
  .filter .mx-datepicker {
    width: 100%;
    input {
      height: 42.5px!important;
      color: #495057;
      font-size: 1.25em;
      &::placeholder {
        color: #6c757d;
      }
    }
  }
  .vue-slider-process {
    background-color: $primary;
  }
  .vue-slider-dot-tooltip-inner {
    background-color: $primary;
    border-color: $primary;
  }
</style>