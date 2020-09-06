<template>
  <div class="card-info flex jc-sb">
    <div class="card-info__left">
      <my-card is-single :card="card"/>
      <div class="card-info__account card mt-5 p-0">
        <div class="flex ai-c pt-4 pb-2 pl-3 pr-3">
          <div class=" mr-3 card-info__icon-wrap primary">
            <font-awesome-icon :icon="['fas', 'check-circle']"/>
          </div>
          <p class="m-0">{{card.balance}}</p>
          <span>Баланс</span>
        </div>
        <hr>
        <div class="flex ai-c pt-2 pb-4 pl-3 pr-3">
          <div class=" mr-3 card-info__icon-wrap orange">
            <font-awesome-icon :icon="['fas', 'clock']"/>
          </div>
          <p class="m-0">{{card.awaitingBalance}}</p>
          <span>Ожидает подтверждения</span>
        </div>
      </div>
      <my-button v-b-modal.changeAccountState class="w-100 mt-5" shadow size="large" type="squared">
        Пополнение/перевод/вывод
      </my-button>
    </div>
    <b-modal
        id="changeAccountState"
        header-close-label
        hide-footer
        header-border-variant="white"
    >
      <div class="d-block">
        <h4 class="mb-5 modal-title text-uppercase text-center">Пополнение, перевод <br>или вывод денежных средств</h4>
        <b-row class="pl-5 pr-5 pb-4">
          <b-col>
            <div>
              <b-form-select placeholder="Выберите тип операции" size="lg" class="mb-3" v-model="currentOperation" :options="operations"></b-form-select>
            </div>
            <b-form-select :disabled="!currentOperation" size="lg" class="mb-3" v-model="currentPaymentMethod" :options="paymentMethods[paymentMethodsSelector]"></b-form-select>
            <b-form-input size="lg" class="mb-3" v-model="operationSum" placeholder="Введите сумму"/>
            <my-button class="w-100 mb-3" size="medium">Выполнить</my-button>
            <router-link class="d-block change-account-state__link" :to="{name: 'TransAdmission', query: {card: card.id}}">Перейти в историю операций</router-link>
          </b-col>
          <b-col>
            <div class="card change-account-state__info">
              <p class="title"><b-icon-info/> Справка</p>
              <hr>
              <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, sequi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus deleniti deserunt, dignissimos magnam perferendis quam quas quos soluta ullam voluptatibus.</p>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <div class="card-info__right card">
      <div class="card-info__head flex jc-sb ai-c">
        <h2 class="card-info__title mb-0">{{currentTab.str}}</h2>
        <div class="card-info__tabs flex">
          <my-button
              :key="tab.str"
              v-for="tab in tabs"
              :color="tab.str === currentTab.str ? 'primary' : 'unactive'"
              @click="setCurrentTab(tab)"
          >
            {{tab.str}}
          </my-button>
        </div>
      </div>
      <div class="card-info__body">
        <component
            :card="card"
            v-if="currentTab !== null"
            :is="currentTab.component"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
  import MyCard from "../components/MyCard";
  import CardDate from "../components/CardInfo/CardDate";
  import ReferalSystem from "../components/CardInfo/ReferalSystem";
  import FamilyAccount from "../components/CardInfo/FamilyAccount";

  export default {
    name: "MyCardInfo",
    data: () => ({
      currentTab: null,
      operations: [
        {value: null, text: 'Выберите тип операции'},
        {value: 1, text: 'Пополнение'},
        {value: 2, text: 'Перевод'},
        {value: 3, text: 'Вывод'}
      ],
      paymentMethods: [
        [
          {value: null, text: 'Выберите способ пополнения'},
          {value: 1, text: 'Мобыльный телефон'},
          {value: 2, text: 'Банковская карта'},
          {value: 3, text: 'Яндекс Деньги'}
        ],
        [
          {value: null, text: 'Выберите способ перевода'},
          'Адзiн', 'Два', 'Тры'
        ],
        [
          {value: null, text: 'Выберите способ вывода'},
          {value: 1, text: 'Мобыльный телефон'},
          {value: 2, text: 'Банковская карта'},
          {value: 3, text: 'Яндекс Деньги'}
        ]
      ],
      tabs: [
        {str: 'Данные карты', component: CardDate},
        {str: 'Рефералка', component: ReferalSystem},
        {str: 'Семейный счёт', component: FamilyAccount},
      ],
      currentOperation: null,
      currentPaymentMethod: null,
      operationSum: null
    }),
    methods: {
      setCurrentTab(tab) {
        this.currentTab = tab
        sessionStorage.setItem('currentCardInfoTab', this.tabs.indexOf(tab))
      }
    },
    beforeMount() {
      this.$store.commit('setSiteContext', 'Для корректной работы кабинета, указывайте только настоящие данные')
      if (sessionStorage.getItem('currentCardInfoTab') && +sessionStorage.getItem('currentCardInfoTab') !== -1 ) {
        this.currentTab = this.tabs[+sessionStorage.getItem('currentCardInfoTab')]
      } else {
        this.currentTab = this.tabs[0]
      }
    },
    components: {
      MyCard
    },
    computed: {
      card() {
        return this.$store.getters.getCardById(+this.$route.params.id)
      },
      paymentMethodsSelector() {
        return this.currentOperation - 1
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card-info {
    &__left {
      width: 21em;
      .my-btn {
        padding: 0 .5em;
      }
    }
    &__icon-wrap {
      width: 2.5em;
      min-width: 2.5em;
      height: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: #ffffff;
      font-size: 1.5em;
      &.primary {
        background: $primaryGrag;
        box-shadow: 0 10px 20px rgba(10, 194, 253, 0.3);
      }
      &.orange {
        background: $orangeGrad;
        box-shadow: 0 10px 20px rgba(255, 133, 31, 0.3);
      }
    }
    &__account {
      p {
        font-size: 2em;
        width: 3.5em;
        min-width: 3.5em;
      }
      span {
        font-size: .9em;
      }
    }
    &__right {
      width: calc(100% - 23em);
    }
    &__head {
      margin-bottom: 3em;
    }
    &__body {
      height: 100%;
    }
    &__title {
      font-size: 1.5em;
    }
    &__tabs {
      .my-btn {
        padding-left: 2em;
        padding-right: 2em;
        &:not(:last-child) {
          margin-right: .5em;
        }
      }
    }
  }
  .modal-title {
    font-size: 2em;
    line-height: 1.3;
  }
  .change-account-state {
    &__link {
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
    }
    &__info {
      .title {
        font-size: 1.25em;
        line-height: 1;
        margin-bottom: 0;
      }

      .text {
        height: 8em;
        overflow: scroll;
        margin-bottom: 0;
      }
    }
  }
</style>

<style lang="scss">
  #changeAccountState .modal-dialog {
    min-width: 40%;
  }
</style>