<template>
  <div>
    <div class="card-head flex ai-c jc-sb mb-5">
      <h3 v-if="currentTab" class="card-title">{{currentTab.str}} списания</h3>
      <div v-if="tabs.length !== 0" class="card-head__menu flex">
        <my-button
            :key="tab.str"
            v-for="(tab, index) in tabs"
            :color="tab.str === currentTab.str ? 'primary' : 'unactive'"
            @click="setCurrentTab(tab)"
            :class="{'ml-2': index !== 0}"
        >
          {{tab.str}}
        </my-button>
      </div>
    </div>
    <trans-filter @filtering="filterList"/>
    <b-table v-if="currentList.length" :fields="currentFields" class="mt-5 transactions-table" :items="currentList">
      <template v-slot:cell(date)="data">
        {{ data.value.toLocaleString().slice(0, -3) }}
      </template>

      <template v-slot:cell(requestNumber)="data">
        №{{ data.value }}
      </template>

      <template v-slot:cell(cardNumber)="data">
        {{ data.value }}
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(company)="data">
        {{ data.item.companyName }} <br>
        {{ data.item.companyCard }}
      </template>
      <template v-slot:cell(paymentSystem)="data">
        {{ data.value }}
      </template>
      <template v-slot:cell(requestSum)="data">
        {{ data.value }} р.
      </template>
      <template v-slot:cell(referral)="data">
        {{ data.value.name || 'Аноним' }}, г. {{ data.value.city || 'Анонимовск' }} <br>
        {{ data.value.card || '0000 0000 0000 0000' }}
      </template>
      <template v-slot:cell(description)="data">
        <p class="m-0 description-col">{{ data.value }}</p>
      </template>
      <template v-slot:cell(admissionSum)="data">
        {{ data.value }} р.
      </template>
      <template v-slot:cell(sum)="data">
        {{ data.value }} р.
      </template>
      <template v-slot:cell(deductionSum)="data">
        {{ data.value }} р.
      </template>
      <template v-slot:cell(status)="data">
        {{ data.value }}
      </template>
    </b-table>
    <h4 v-else class="text-center mt-5">Транзакций по данному запросу не найдено</h4>
    <div v-if="currentList.length" class="flex mt-4 ai-c">
      <div class="flex">
        <div class="card card-total card-orange p-3 mr-4">
          Общий доход:
          <p>32 450 р.</p>
        </div>
        <div class="card card-total card-primary p-3">
          Доход от кэшбэка:
          <p>3 410 р.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import TransFilter from "./TransFilter";
  export default {
    name: "WriteOff",
    data: () => ({
      currentTab: null,
      currentData: null,
      tabs: [
        {
          str: 'Кэшбэк',
          type: 'cash-back',
          fields: [
            {key: 'date', sortable: true, label: 'Дата и время'},
            {key: 'requestNumber', label: 'Номер заказа'},
            {key: 'cardNumber', label: 'Номер карты', formatter: value => {
                let newString = value.slice(0, 5) + '...'
                newString += value.slice(-5)
                return newString
              }},
            {key: 'company', label: 'Название заведения'},
            {key: 'requestSum', sortable: true, label: 'Сумма покупки'},
            {key: 'sum', sortable: true, label: 'Кэшбэк'},
            {key: 'status', label: 'Статус'}
          ],
        },
        {
          str: 'Вывод средств',
          type: 'deduction',
          fields: [
            {key: 'date', sortable: true, label: 'Дата и время'},
            {key: 'requestNumber', label: 'Номер документа'},
            {key: 'cardNumber', label: 'Номер карты', formatter: value => {
                let newString = value.slice(0, 5) + '...'
                newString += value.slice(-5)
                return newString
              }
            },
            {key: 'paymentSystem', label: 'Платежная система'},
            {key: 'accountNumber', sortable: true, label: 'Номер счёта', formatter: value => {
                return '**** ' + value.slice(-5)
              }
            },
            {key: 'deductionSum', sortable: true, label: 'Сума списания'},
            {key: 'status', label: 'Статус'}
          ],
        },
        {
          str: 'Покупки в Raketa',
          type: 'raketaStore',
          fields: [
            {key: 'date', sortable: true, label: 'Дата и время'},
            {key: 'requestNumber', label: 'Номер документа'},
            {key: 'cardNumber', label: 'Номер карты', formatter: value => {
                let newString = value.slice(0, 5) + '...'
                newString += value.slice(-5)
                return newString
              }},
            {key: 'service', label: 'Услуга'},
            {key: 'description', label: 'Описание', formatter: value => {
              return value.slice(0, 90)
              }},
            {key: 'deductionSum', sortable: true, label: 'Сумма'},
            {key: 'status', label: 'Статус'}
          ],
        },
        {
          str: 'Переводы',
          type: 'transfers',
          fields: [
            {key: 'date', sortable: true, label: 'Дата и время'},
            {key: 'operationNumber', label: 'Номер операции'},
            {key: 'cardNumber', label: 'Номер карты', formatter: value => {
                let newString = value.slice(0, 5) + '...'
                newString += value.slice(-5)
                return newString
              }},
            {key: 'writeOffMethod', label: 'Способ вывода'},
            {key: 'deductionSum', sortable: true, label: 'Сумма'},
            {key: 'status', label: 'Статус'}
          ],
        }
      ],
      currentList: [],
      currentFields: [],
      currentFilter: {}

    }),
    methods: {
      setCurrentTab(tab) {
        this.currentTab = tab
        sessionStorage.setItem('currentTransWriteOffTab', this.tabs.indexOf(tab))
        this.currentFields = this.currentTab.fields
        this.filterList(this.currentFilter)
      },
      filterList(settings = {}) {
        this.currentFilter = {
          ...settings,
          transType: 'write-off',
          subType: this.currentTab.type
        }
        console.log(this.currentFilter)
        this.currentList = this.$store.getters.getTransitionsByParams(this.currentFilter)
      }
    },
    beforeMount() {
      if (sessionStorage.getItem('currentTransWriteOffTab') && +sessionStorage.getItem('currentTransWriteOffTab') !== -1 ) {
        this.currentTab = this.tabs[+sessionStorage.getItem('currentTransWriteOffTab')]
      } else {
        this.currentTab = this.tabs[0]
      }
      this.currentFields = this.currentTab.fields
    },
    components: {
      TransFilter
    },
  }
</script>

<style lang="scss" scoped>
  .card-orange {
    background: $orangeGrad;
    color: #ffffff;
  }
  .card-primary {
    background: $primaryGrag;
    color: #ffffff;
  }
  .card-total {
    min-width: 14em;
    p {
      font-size: 2em;
      margin: 0;
    }
  }
  .description-col {
    max-width: 15em;
    text-align: justify;
  }
</style>

<style lang="scss">
  .transactions-table td {
    vertical-align: middle;
    width: calc(80% / 5);
    &:nth-child(3) {
      width: 10%;
    }
    &:nth-child(6) {
      width: 10%;
    }
  }
</style>