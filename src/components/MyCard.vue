<template>
  <div class="card-item">
    <div class="card-mockup flex fd-c mb-4">
      <div v-if="card.customImage" class="card-bg card-custom-bg">
        <img :src="card.customImage" alt="">
      </div>
      <div v-if="!card.customImage" class="card-logo">
        <img src="../assets/images/card-logo.png" alt="">
      </div>
      <div v-if="card.type === 'simple'" class="card-bg card-simple-bg">
        <img src="../assets/images/card-x.png" alt="">
      </div>
      <div v-if="card.type === 'double'" class="card-bg card-simple-bg">
        <img src="../assets/images/card-2X.png" alt="">
      </div>
      <div class="card-front flex fd-c jc-sb">
        <div class="card-balance mb-4">Баланс {{card.balance}} р.</div>
        <p class="card-status">{{card.status === 0 ? "Заблокирована" : "Активна"}}</p>
        <p class="mb-4">Карта клиента</p>
        <p class="card-name">{{card.name.toUpperCase()}}</p>
        <p v-if="card.type === 'simple'" class="card-label">Вперед за кэшбэком</p>
        <p v-if="card.type === 'double'" class="card-label double">Вперед за <span>двойным</span> кэшбэком</p>
        <p v-else class="card-label"></p>
        <div class="card-number">{{cardNumber}}</div>
      </div>
    </div>
    <div class="card-buttons flex jc-sb">
      <my-button shadow type="squared">
        <font-awesome-icon class="my-btn__icon" :icon="['fas', 'shopping-bag']"/>
        К покупкам
      </my-button>
      <my-button v-if="isSingle === ''" shadow type="squared" color="orange">
        <router-link :to="{name: 'TransAdmission', query: {card: card.id}}">
          <b-icon-credit-card class="my-btn__icon big"/>
          В транзакции
        </router-link>
      </my-button>
      <my-button v-else shadow type="squared" color="orange">
        <router-link :to="{name: 'MyCardInfo', params: {id: card.id}}">
          <b-icon-credit-card class="my-btn__icon big"/>
          Открыть карту
        </router-link>
      </my-button>
      <my-button type="squared" color="white">
        <font-awesome-icon class="my-btn__icon small" :icon="['fas', 'qrcode']"/>
        QR
      </my-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MyCard",
    props: ['card', 'isSingle'],
    computed: {
      cardNumber() {
        return "****" +this.card.number.slice(-4)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    &-item {
      width: 21em;
    }
    &-mockup {
      width: 100%;
      height: 13em;
      background: #e8e8e8;
      position: relative;
      border-radius: 5px;
    }
    &-logo {
      position: absolute;
      left: 1em;
      top: .2em;
      width: 19%;
      height: 22%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &-bg {
      position: absolute;
      left: auto;
      top: .5em;
      width: 50%;
      right: 0;
      bottom: .5em;
      z-index: 0;
      &.card-custom-bg {
        left: auto;
        top: 2em;
        bottom: 2em;
        right: 2em;
      }
      img {
        height: 100%;
        width: 100%;
        position: absolute;
        object-fit: contain;
      }
    }
    &-front {
      z-index: 2;
      position: absolute;
      left: 1em;
      top: 1em;
      right: 1em;
      bottom: 1em;
      display: block;
      p {
        margin-bottom: 0;
        padding: 0;
      }
    }
    &-balance {
      width: fit-content;
      margin-left: auto;
      background: $primaryGrag;
      box-shadow: 0 2px 5px rgba(8, 177, 249, 0.47);
      border-radius: 5px;
      opacity: 0.9;
      padding: .15em .5em;
      color: #fff;
    }
    &-status {
      color: #848484;
      font-size: 1.25em;
      line-height: 1;
    }
    &-name {
      font-size: 1.3em;
    }
    &-label {
      font-size: .9em;
      &.double {
        font-size: .8em;
        span {
          padding: .1em .5em;
          background: url("../assets/images/cosmos.jpg");
          background-size: cover;
          color: #ffffff;
          border-radius: 3px;

        }
      }
    }
    &-number {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #fff;
      border-radius: 5px;
      background-color: #171820;
      padding: 0 .5em
    }
    &-buttons {
      .my-btn {
        padding: .35em;
      }
    }
  }
</style>