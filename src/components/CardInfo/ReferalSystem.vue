<template>
  <div class="card-refer">
    <b-table v-if="items" :fields="fields" sticky-header hover :items="items">
      <template v-slot:cell(refDate)="data">
        {{data.value.toLocaleDateString()}}
      </template>
      <template v-slot:cell(refUser)="data">
        {{data.item.refInfo.name}} <br>
        г. {{data.item.refInfo.city}}
      </template>
      <template v-slot:cell(card)="data">
        {{data.value}}
      </template>
      <template v-slot:cell(userStauts)="data">
        {{data.value}}
      </template>
      <template v-slot:cell(yourAdd)="data">
        {{data.value}}
      </template>
    </b-table>
    <b-row>
      <b-col class="flex fd-c jc-sb">
        <p class="m-0">Поделитесь Вашей реферальной ссылкой, чтобы получать до 80% от кэшбэка пользователей.</p>
        <div class="card">
          <div class="flex ai-c ref-link">
            <p class=" mb-0 mr-4">{{myRef}}</p>
            <a @click.prevent="copyLink">
              <font-awesome-icon class="ref-link__copy" :icon="['fas', 'copy']"/>
            </a>
          </div>
        </div>
      </b-col>
      <b-col>
        <div class="card primary">
          <p class="">Общая сумма вознаграждения, начисленная от пользователей:</p>
          <p class="sum">{{amountSum}} р.</p>
        </div>
      </b-col>
      <b-col class="flex fd-c jc-sb">
        <div class="card orange pt-2 pb-2">
          <p class="mb-1">Подключено:</p>
          <p class="mb-1 medium-text">{{usersCount}} пользователей</p>
        </div>
        <div class="card orange pt-2 pb-2">
          <p class="mb-1">Активных в этом месяце:</p>
          <p class="mb-1 medium-text">{{activeUsersCount}} пользователей</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          { key: 'refDate', label: 'Зарегестрирован'},
          {key: 'refUser', label: 'Реферал'},
          {key: 'card', label: 'Карта'},
          {key: 'userStatus', label: 'Статус пользователя'},
          {key: 'yourAdd', label: 'Ваш доход'}
        ],
        items: [
          { refDate: new Date(), refInfo: {name: 'Сергей', city: 'Иваново'}, card: '0000 0000 1111 2222', userStatus: 'Клиент', yourAdd: 1200},
          { refDate: new Date(), refInfo: {name: 'Вася', city: 'Иваново'}, card: '0000 0000 1111 2222', userStatus: 'Клиент', yourAdd: 1200},
          { refDate: new Date(), refInfo: {name: 'Петя', city: 'Москва'}, card: '0000 0000 1111 2222', userStatus: 'Клиент', yourAdd: 1200},
          { refDate: new Date(), refInfo: {name: 'Сергей', city: 'Иваново'}, card: '0000 0000 1111 2222', userStatus: 'Клиент', yourAdd: 1200},
          { refDate: new Date(), refInfo: {name: 'Сергей', city: 'Иваново'}, card: '0000 0000 1111 2222', userStatus: 'Клиент', yourAdd: 1200},
          { refDate: new Date(), refInfo: {name: 'Сергей', city: 'Иваново'}, card: '0000 0000 1111 2222', userStatus: 'Клиент', yourAdd: 1200},
        ],
        activeUsersCount: 10,
        myRef: 'www.racetacb.ref=34280'
      }
    },
    computed: {
      amountSum() {
        let amount = 0
        this.items.forEach(el => { amount += el.yourAdd})
        return amount
      }, usersCount() {
        return this.items.length
      }
    },
    methods: {
      copyLink() {
        navigator.clipboard.writeText(this.myRef)
        this.$bvToast.toast(`Ваша реферальная ссылка скопирована в буфер обмена`, {
          variant: 'success',
          solid: true,
          title: 'Ссылка скопирована',
          autoHideDelay: 3000,
          appendToast: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ref-link {
    color: $primary;
    &__copy {
      font-size: 1.5em;
      cursor: pointer;
      margin-left: auto;
    }
  }
  .card {
    &.primary {
      background: $primaryGrag;
      color: #ffffff;
      box-shadow: 0 10px 20px rgba(16, 189, 254, 0.3);
    }
    &.orange {
      background: $orangeGrad;
      color: #ffffff;
      box-shadow: 0 10px 20px rgba(255, 128, 22, 0.3);
    }
    .sum {
      font-size: 3em;
      margin: 0;
    }
    .medium-text {
      font-size: 1.5em;
    }
  }
</style>