<template>
  <div class="company-card card">
    <div class="balance flex jc-sb">
      <div class="balance-left">
        <p>Клиентов <br> {{12908 | number}}</p>
      </div>
    </div>
    <div class="company-card__avatar">
      <div class="company-card__avatar__wrapper">
        <img v-if="avatar.src" :src="avatar.src" alt="">
        <img v-else src="../../../assets/images/company-logo.png" alt="">
      </div>
      <a v-b-modal.add-user-avatar class="change-avatar"></a>
      <span class="change-avatar__barge">
        <font-awesome-icon :icon="['fas', 'plus']"/>
      </span>
    </div>
    <div class="company-card__name text-center">ООО "Божий промысел"</div>
    <div class="company-card__status text-center">Статус партнера</div>
    <div class="company-card__buttons flex">
      <my-button color="primary" shadow type="squared">
        <font-awesome-icon class="my-btn__icon" :icon="['fas', 'chart-pie']"/>
        Сводка
      </my-button>
      <my-button @click="$router.push({name: 'PaymasterWindow'})" class="px-1" color="orange" shadow type="squared">
        <b-icon-credit-card class="my-btn__icon big"/>
        Окно кассира
      </my-button>
    </div>
    <div class="company-card__links">
      <router-link class="company-card__link" active-class="active" :to="{name: 'companySettings'}">
        <font-awesome-icon :icon="['fas', 'cog']" class="mr-3"/>
        Настройки аккаунта
      </router-link>
      <router-link class="company-card__link" active-class="active" :to="{name: 'companySupport'}">
        <font-awesome-icon :icon="['fas', 'life-ring']" class="mr-3"/>
        Поддержка
      </router-link>
    </div>
    <b-modal
        id="add-user-avatar"
        header-close-label
        hide-footer
        header-border-variant="white"
    >
      <form @submit.prevent="uploadPhoto">
        <h4 class="mb-3">Загрузить новое фото профиля</h4>
        <b-form-file
            class="mb-5"
            size="lg"
            drop-placeholder="Перетащите фото сюда"
            placeholder="Отсутствует изображение..."
            browse-text="Выбрать"
            v-model="newAvatar"
            accept="image/jpeg, image/png, image/gif"
        >
        </b-form-file>
        <submit-buttons @onCancel="$bvModal.hide('add-user-avatar')" confirm-label="Загрузить" form-submit/>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "CompanyCard",
    data: () => ({
      newAvatar: null,
      avatar: {
        src: ''
      }
    }),
    methods: {
      uploadPhoto() {
        this.avatar.src = URL.createObjectURL(this.newAvatar)
        this.$bvModal.hide('add-user-avatar')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .company-card {
    width: 25em;
    padding-top: 3em;
    &__avatar {
      width: 12em;
      height: 12em;
      margin: 2em auto ;
      position: relative;
      @media (max-width: 1600px) {
        margin-bottom: 1em;
        width: 11em;
        height: 11em;
      }
      &__wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .change-avatar {
        position: absolute;
        cursor: pointer;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        &__barge {
          display: flex;
          visibility: hidden;
          opacity: 0;
          transition: .3s;
          position: absolute;
          left: 80%;
          top: 10%;
          width: 40px;
          height: 40px;
          box-shadow: $cardShadow;
          border-radius: 50%;
          color: $primary;
          background-color: $themeGray;
          border: 3px solid lighten($themeGray, 20%);
          svg {
            margin: auto;
          }
        }
      }
      &:hover {
        .change-avatar__barge {
          visibility: visible;
          opacity: 1;
        }
      }
    }
    &__name {
      font-size: 1.25em;
      margin-bottom: .25em;
    }
    &__status {
      color: #999;
      margin-bottom: 1.25em;
    }
    &__buttons {
      justify-content: space-between;
      margin-bottom: 2em;
      .my-btn {
        width: 48%;
      }
    }
    &__link {
      width: calc(100% + 4em);
      display: block;
      padding: .75em 2em;
      color: $textColor;
      margin-left: -2em;
      &:hover {
        text-decoration: none;
        color: $primary;
      }
      &.active {
        border-top: 1px solid #eeeeee;
        color: $primary;
        background: $themeGray;
      }
    }
  }
  .balance {
    position: absolute;
    left: 1em;
    top: 1em;
    width: calc(100% - 2em);
    font-size: 1.25em;
  }
</style>