<template>
  <div class="card-family">
    <b-table v-if="items.length !== 0" no-select-on-click :fields="fields" sticky-header hover :items="items">
      <template v-slot:cell(regDate)="data">
        {{data.value.toLocaleDateString()}}
      </template>
      <template v-slot:cell(name)="data">
        {{data.value}}
      </template>
      <template v-slot:cell(card)="data">
        {{data.value}}
      </template>
      <template v-slot:cell(phone)="data">
        {{data.value}}
      </template>
      <template v-slot:cell(actions)="data">
        <a v-b-modal.remove-family-user @click="removedUserId = data.item.id" class="link danger">Удалить</a>
      </template>
    </b-table>
    <p v-else class="text-center">Пользователей в семейном счёте не найдено</p>
    <p class="large">Добавьте нового пользователя в семейный аккаунт</p>
    <b-row v-if="!codeIsSent" align-v="center">
      <b-col class="flex fd-c jc-sb">
        <p class="m-0">Зарегистрируйте карту Вашему члену семьи в 2 клика и пользуйтесь единым счетом</p>
      </b-col>
      <b-col>
        <masked-input class="form-control form-control-lg" mask="\+\7 (111) 111 1111" placeholder="+7 (XXX) XXX XX XX" />
<!--        <b-form-input size="lg" v-model="phone" placeholder="+7 (XXX) XXX XX XX"/>-->
      </b-col>
      <b-col>
        <my-button @click="sendCode" class="w-100" >Регистрация</my-button>
      </b-col>
    </b-row>
    <b-row v-else align-v="center">
      <b-col class="flex fd-c jc-sb">
        <p class="m-0">Зарегистрируйте карту Вашему члену семьи в 2 клика и пользуйтесь единым счетом</p>
      </b-col>
      <b-col>
        <b-form-input size="lg" v-model="code" placeholder="Введите код из PUSH"/>
        <a href="#" @click.prevent="" class="absolute-link">Отправить код в SMS</a>
      </b-col>
      <b-col>
        <my-button @click="sendCode" class="w-100" >Подтвердить</my-button>
      </b-col>
    </b-row>
    <b-modal
        id="remove-family-user"
        header-close-label
        hide-footer
        header-border-variant="white"
    >
      <div class=" mx-3 d-block">
        <h4 class="mb-5 lh-2">Вы действительно хотите удалить пользователя из семейного счёта?</h4>
        <submit-buttons @onCancel="$bvModal.hide('remove-family-user')" @onConfirm="removeUser" confirm-label="Удалить"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        removerUserId: null,
        fields: [
          { key: 'regDate', label: 'Зарегестрирован'},
          {key: 'name', label: 'Имя'},
          {key: 'card', label: 'Карта'},
          {key: 'phone', label: 'Телефон'},
          {key: 'actions', label: 'Действия'}
        ],
        items: [
          { id: 1, regDate: new Date(), name: 'Сергей', card: '0000 0000 1111 2222', phone: '+7 (XXX) XXX XX XX'},
          { id: 2, regDate: new Date(), name: 'Вася', card: '0000 0000 1111 2222', phone: '+7 (XXX) XXX XX XX'},
          { id: 3, regDate: new Date(), name: 'Петя', card: '0000 0000 1111 2222', phone: '+7 (XXX) XXX XX XX'},
          { id: 4, regDate: new Date(), name: 'Сергей', card: '0000 0000 1111 2222', phone: '+7 (XXX) XXX XX XX'},
          { id: 5, regDate: new Date(), name: 'Сергей', card: '0000 0000 1111 2222', phone: '+7 (XXX) XXX XX XX'},
          { id: 6, regDate: new Date(), name: 'Сергей', card: '0000 0000 1111 2222', phone: '+7 (XXX) XXX XX XX'},
        ],
        activeUsersCount: 10,
        myRef: 'www.racetacb.ref=34280',
        codeIsSent: false,
        phone: '',
        code: ''
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
      },
      sendCode() {
        this.codeIsSent = true
        /* TODO: Отправка кода в пуш уведомления*/
      },
      removeUser() {
        this.items = this.items.filter(el => el.id !== this.removedUserId)
        this.$bvModal.hide('remove-family-user')
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
    &-family {
      .my-btn {
        height: 42.5px;
        line-height: 42.5px;
      }
      p.large {
        font-size: 1.75em;
      }
    }
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
  .absolute-link {
    position: absolute;
    top: 50px;
    left: 15px;
  }
</style>