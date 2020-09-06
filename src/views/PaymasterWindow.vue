<template>
  <b-row>
    <b-col cols="3">
      <div class="paymaster-card card">
        <div class="paymaster-card__header">
          <font-awesome-icon class="paymaster-card__header--icon" :icon="['fas', 'user-circle']"/>
          <h4>{{step === 0 ? step1title : step2title}}</h4>
        </div>
        <ul v-if="step === 0" class="paymaster-card__menu">
          <li
              @click="setTab(item)"
              v-for="item in menuItemsStep1"
              :key="item.id"
              :class="{active: currentTab === item}"
          >
            <font-awesome-icon class="paymaster-card__menu--icon" :icon="['fas', item.icon]"/>
            {{item.name}}
          </li>
        </ul>
        <ul v-if="step === 1" class="paymaster-card__menu">
          <li
              @click="setTab(item)"
              v-for="item in menuItemsStep2"
              :key="item.id"
              :class="{active: currentTab === item}"
          >
            <font-awesome-icon class="paymaster-card__menu--icon" :icon="['fas', item.icon]"/>
            {{item.name}}
          </li>
        </ul>
        <my-button v-if="step === 0" @click="currentTab = regTab" class="paymaster-card__btn" color="orange" shadow type="squared">
          <b-icon-credit-card class="my-btn__icon big"/>
          Зарегистрировать карту
        </my-button>
      </div>
    </b-col>
    <b-col v-if="currentTab" cols="9">
      <div class="paymaster-info card h-100 d-flex fd-c">
        <h3 class="mb-3">{{currentTab.name}}</h3>
        <b-row class="fg-2">
          <b-col cols="7">
            <component @selectClient="selectClient" v-if="currentTab" :is="currentTab.component"/>
          </b-col>
          <b-col cols="5">
            <div v-if="!currentClient" class="inputs__field">
              <h4>Инструкция:</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto consectetur consequuntur dolorum ex id ipsa iste laudantium natus omnis porro quaerat quasi, quia reiciendis repellendus vel veniam voluptatum! Asperiores deleniti ea molestiae nihil numquam obcaecati odit optio quod vero!</p>
            </div>
            <div v-else>
              <b-carousel
                  id="client-cards-carousel"
                  fade
                  controls
                  indicators
                  no-animation
                  :interval="0"
              >
                <b-carousel-slide
                    v-for="card in currentClient.cards"
                    :key="card.id"
                    img-blank
                >
                  <template v-slot:img>
                    <div class="card">
                      <div class="d-flex ai-c">
                        <div class="paymaster-info__client-head--img mr-3">
                          <img src="" alt="">
                        </div>
                        <div>
                          <p class="mb-1">Владелец карты:</p>
                          <p class="mb-0">{{currentClient.name}}</p>
                        </div>
                      </div>
                      <span :style="{color: card.status ? '#16b9ff' : '#f80723'}" class="paymaster-info__client-card--status">{{card.status ? 'Активна' : 'Заблокирована'}}</span>
                      <p class="paymaster-info__client-card--number">
                        <span v-for="item in cardNumber(card.number)" :key="item">{{item}}</span>
                      </p>
                      <p class="mb-1">
                        Тариф:
                        <span v-if="card.type === 'double'">X2</span>
                        <span v-else-if="card.type === 'simple'">Простой</span>
                        <span v-else-if="card.type === 'custom'">Индивидуальный</span>
                      </p>
                    </div>
                    <div class="paymaster-info__client-card--balance mt-5">
                      <div>
                        <p class="text-primary mb-1">Доступно: {{card.balance | number}} р.</p>
                        <p class="mb-0">В обработке: {{card.awaitingBalance | number}} р.</p>
                      </div>
                      <my-button v-if="step === 0" @click="setTab(menuItemsStep2[0])" size="large">Продолжить</my-button>
                      <my-button v-else @click="step = 0" size="large">В профиль</my-button>
                    </div>
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
  import Barcode from "../components/PaymasterWindow/Barcode";
  import CreditCard from "../components/PaymasterWindow/CreditCard";
  import Phone from "../components/PaymasterWindow/Phone";
  import RegCard from "../components/PaymasterWindow/RegCard";
  import Qrcode from "../components/PaymasterWindow/Qrcode";
  import NameSearch from "../components/PaymasterWindow/NameSearch";
  import Sale from "../components/PaymasterWindow/Sale";
  import AddBalance from "../components/PaymasterWindow/AddBalance";
  import OperationsHistory from "../components/PaymasterWindow/OperationsHistory";

  export default {
    name: "PaymasterWindow",
    data: () => ({
      currentTab: null,
      currentClient: null,
      currentCard: null,
      step1title: 'Выберите способ поиска клиента:',
      step2title: 'Выберите тип\n операции:',
      step: 0,
      regTab: {
        id: 5,
        name: 'Регистрация карты',
        component: RegCard
      },
      menuItemsStep1: [
        {
          id: 0,
          name: 'QR-код',
          icon: 'qrcode',
          component: Qrcode,
        },
        {
          id: 1,
          name: 'Штрих-код',
          icon: 'barcode',
          component: Barcode,
        },
        {
          id: 2,
          name: 'Номер телефона',
          icon: 'phone',
          component: Phone,
        },
        {
          id: 3,
          name: 'Номер карты',
          icon: 'credit-card',
          component: CreditCard,
        },
        {
          id: 4,
          name: 'ФИО клиента',
          icon: 'user',
          component: NameSearch,
        },
      ],
      menuItemsStep2: [
        {
          id: 5,
          name: 'Продажа',
          icon: 'shopping-cart',
          component: Sale,
        },
        {
          id: 6,
          name: 'Пополнение баланса',
          icon: 'plus-circle',
          component: AddBalance,
        },
        {
          id: 7,
          name: 'История операций',
          icon: 'history',
          component: OperationsHistory,
        }
      ]
    }),
    methods: {
      setTab(item) {
        this.currentTab = item
        if (this.menuItemsStep2.includes(item) && this.step === 0) {
          this.step = 1
          return 0
        }
        sessionStorage.setItem('paymasterWindowTab', item.id)
      },
      selectClient(client) {
        this.currentClient = client

      },
      cardNumber(number) {
        const newNumber = number.replace(/[^\d]/g, '')
        const cardArr = []
        cardArr.push(newNumber.slice(0,4))
        cardArr.push(newNumber.slice(4,8))
        cardArr.push(newNumber.slice(8,12))
        cardArr.push(newNumber.slice(12))
        return cardArr
      }
    },
    mounted() {
      this.currentTab = this.menuItemsStep1.find(el => el.id === +sessionStorage.getItem('paymasterWindowTab')) || this.menuItemsStep1[0]
    }
  }
</script>

<style scoped lang="scss">
  .paymaster-card {
    padding: 0 0 2rem 0;
    &__header {
      background-color: #23252f;
      color: #ffffff;
      padding: 2em;
      display: flex;
      align-items: center;
      &--icon {
        font-size: 2rem;
        margin-right: 1.5rem;
      }
      h4 {
        margin: 0;
      }
    }
    &__menu {
      padding: 0;
      li {
        list-style: none;
        padding: .75rem 2rem;
        cursor: pointer;
        &:hover {
          background-color: #f7fafc;
        }
        &.active {
          color: #ffffff;
          background-color: $primary;
        }
      }
      &--icon {
        width: 25px;
      }
    }
    /*&__search-field {
      padding: 0 2rem;
      position: relative;
      .search-field {
        &__input {
          width: 100%;
          border-radius: 20px;
          border: 1px solid #c4c4c4;
        }
        &__icon {
          position: absolute;
          left: auto;
          right: 3rem;
          top: 50%;
          transform: translateY(-50%);
          line-height: 1;
        }
      }
    } */
    &__btn {
      margin: 2rem 2rem 0;
    }
  }
  .inputs__field {
    width: 100%;
    padding: .5rem 1.25rem;
  }
  .paymaster-info {
    &__client {
      &-head {
        &--img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background-color: darken($themeGray, 10%);
        }
      }
      &-card {
        &--balance {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        &--status {
          margin-top: 2rem;
          display: block;
          text-align: right;
          line-height: 1;
        }
        &--number {
          margin-bottom: 0;
          display: flex;
          justify-content: space-between;
          font-size: 2.25rem;
        }
      }
    }
  }
</style>
<style lang="scss">
  #client-cards-carousel {
    margin-top: -2rem;
    margin-right: -2rem;
    .card {
      border-radius: 1rem;
    }
    .carousel-item {
      padding: 2rem 2rem;
    }
    .carousel-control-prev, .carousel-control-next {
      width: 20px;
      height: 20px;
      background-color: $primary;
      opacity: 1;
      border-radius: 50%;
      top: calc(2rem + 20px);
      text-align: center;
      transition: .3s;
      &:hover {
        background-color: #23252f;
      }
    }
    .carousel-control-prev {
      left: auto;
      right: calc(3rem + 25px);
    }
    .carousel-control-next {
      right: 3rem;
    }
    .carousel-control-prev-icon, .carousel-control-next-icon {
      width: 10px;
      height: 10px;
    }
    .carousel-indicators {
      top: auto;
      bottom: 7rem;
      margin: 0;
      left: 2rem;
      justify-content: flex-start;
      li {
        background: #333;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        padding: 0;
        border: none;
        opacity: 1;
        &.active {
          background-color: $primary;
        }
      }
    }
  }
</style>