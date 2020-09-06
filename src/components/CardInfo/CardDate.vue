<template>
  <div class="card-date">
    <p>Баланс: {{card.balance}} р.<a class="link ml-2" v-b-modal.changeAccountState>Пополнить</a></p>
    <p>Номер карты: {{card.number}}</p>
    <p>Зарегестрирована: {{card.name}}</p>
    <p>Тип программы лояльности: {{card.loyaltyProgramType}}</p>
    <p>Статус карты: {{card.status === 0 ? "Заблокирована" : "Активна"}}</p>
    <p>Статус пользователя: {{card.userStatus}}</p>
    <p>
      Тариф:
      <span v-if="card.type === 'double'">X2</span>
      <span v-else-if="card.type === 'simple'">Простой</span>
      <span v-else-if="card.type === 'custom'">Индивидуальный</span>
      <a class="link ml-2" v-b-modal.change-tarif>Сменить тариф</a>

    </p>
    <b-modal
        id="change-tarif"
        header-close-label
        hide-footer
        header-border-variant="white"
    >
      <div class="d-block">
        <h4 class="mb-5 modal-title text-uppercase text-center">Пополнение, перевод <br>или вывод денежных средств</h4>
        <b-row class="pl-5 pr-5 pb-4">
          <b-col>
            <b-form-select size="lg" class="mb-3" v-model="currentTariff" :options="tariffs"></b-form-select>
            <p class="mb-4" v-if="currentTariff">Стоимость перехода {{tariffs[currentTariff].price}} р.</p>
            <my-button class="w-100 mb-3" size="medium">Оплатить и перейти</my-button>
            <p class="mt-3 mb-0">Нажимая на кнопку, Вы подтвержате свое согласие с условиями тарифа. Оплата происходит через Яндекс.Кассу.</p>
          </b-col>
          <b-col>
            <div class="card change-account-state__info">
              <p class="title"><b-icon-info/> Описание тарифа</p>
              <hr>
              <p class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, sequi. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus deleniti deserunt, dignissimos magnam perferendis quam quas quos soluta ullam voluptatibus.</p>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "CardDate",
    props: ['card'],
    data: () => ({
      tariffs: [
        {value: null, text: "Выберите тариф"},
        {value: 1, text: "Тариф 1", price: 1900},
        {value: 2, text: "Тариф 2", price: 1600},
        {value: 3, text: "Тариф 3", price: 1400}
      ],
      currentTariff: null
    })
  }
</script>

<style lang="scss" scoped>
  .card-date {
    color: #656565;
    p {
      margin-bottom: .5em;
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
  #change-tarif .modal-dialog {
    min-width: 40%;
  }
</style>