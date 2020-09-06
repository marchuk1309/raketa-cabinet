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
      <div class="filter-fields">
        <div class="flex ai-c mb-5">

          <b-select
              class="mr-3"
              v-if="cardList"
              size="lg"
              v-model="currentCard"
              :options="cardList"
          />
          <date-picker
              class="mr-3"
              value-type="date"
              placeholder="Начальная дата"
              :format="momentFormat"
              v-model="startDate"
          />
          <date-picker
              value-type="date"
              placeholder="Конечная дата"
              :format="momentFormat"
              v-model="endDate"
          />
        </div>
        <div class="flex ai-c">
<!--          <b-select class="w-50 mr-3" size="lg" v-model="currentCompany" :options="companyList"/>-->
          <multiselect
            class="w-50 mr-4"
            v-model="currentCompany"
            :options="companyList"
            :multiple="true"
            selectedLabel="✔"
            placeholder="Выберите заведение"
          />
          <div class="w-50">
            <p class="text-center mb-2">Сумма кэшбэка</p>
            <vue-slider
                v-if="sum.length === 2"
                v-model="sum"
                :min="0"
                :max="maxSum"
                class="w-100"
            />
          </div>
        </div>
      </div>
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
  import Multiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css'
  import moment from 'moment'
  export default {
    name: "TransFilter",
    data: () => ({
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
      companyList: [
        'Дзедава карчма',
        'Белая ворона',
        'Седая ночь',
        'Пьяная устрица'
      ],

      currentCard: null,
      startDate: '',
      endDate: '',
      currentCompany: null,
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
      Multiselect
    }
  }
</script>

<style lang="scss" scoped>
  .collapse-pointer {
    line-height: 1;
    cursor: pointer;
    width: fit-content;
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
  .multiselect__tags {
    padding-left: 1.25rem;
  }
  .multiselect__option--highlight {
    background: $primary!important;
    &:after {
      content: none!important;
    }
  }
  .multiselect__placeholder, .multiselect__input {
    padding-top: 0!important;
    padding-left: 0!important;
    color: #495057!important;
    font-size: 1.25rem!important;
  }
  .multiselect__tag {
    background: $primary!important;
    &-icon {
      &:hover {
        background: $primary!important;
      }
    }
  }
  .multiselect__input {
    display: none!important;
  }
  .multiselect__tag-icon {
    line-height: 1;
    padding: 5px 0;
  }
</style>