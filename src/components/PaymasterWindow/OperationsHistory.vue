<template>
  <div class="operations-history__table">
    <div class="operations-history__head">
      <div class="operations-history__col">Дата и время</div>
      <div class="operations-history__col">Заказ</div>
      <div class="operations-history__col">Статус</div>
      <div class="operations-history__col">Сумма</div>
    </div>
    <div class="operations-history__body">
      <div class="operations-history__row" v-for="item in history" :key="item.order">
        <div class="operations-history__col">{{item.date}}<br><span>{{item.time}}</span></div>
        <div class="operations-history__col">{{item.order}}</div>
        <div class="operations-history__col">{{item.status}}</div>
        <div class="operations-history__col">{{item.amount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ModelListSelect } from 'vue-search-select'
  import 'vue-search-select/dist/VueSearchSelect.css'
  import {clientsDatabase} from "../../assets/localData";
  export default {
    name: "OperationsHistory",
    components: {
      ModelListSelect
    },
    data: () => ({
      history: [
        {date: '10.08.20', time: '12:55', order: '6573955', status: 'Ожидает', amount: 5000},
        {date: '10.08.20', time: '12:55', order: '6573956', status: 'Ожидает', amount: 5000},
        {date: '10.08.20', time: '12:55', order: '6573957', status: 'Ожидает', amount: 5000},
        {date: '10.08.20', time: '12:55', order: '6573958', status: 'Ожидает', amount: 5000},
        {date: '10.08.20', time: '12:55', order: '6573959', status: 'Ожидает', amount: 5000},
        {date: '10.08.20', time: '12:55', order: '6573960', status: 'Ожидает', amount: 5000},
        {date: '10.08.20', time: '12:55', order: '6573961', status: 'Ожидает', amount: 5000}
      ]
    }),
  }
</script>

<style lang="scss">
  .operations-history {
    &__table {
      height: 315px;
      overflow-y: scroll;
    }
    &__head, &__row {
      display: flex;
      padding: 10px;
    }
    &__row {
      &:hover {
        background-color: $primary;
        color: #ffffff;
        span {
          color: #ffffff;
        }
      }
    }
    &__col {
      width: 25%;
      span {
        color: #9c9c9c;
      }
    }
  }
</style>