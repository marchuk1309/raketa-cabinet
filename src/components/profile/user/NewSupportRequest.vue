<template>
  <div>
    <p>Часы работы службы технической поддержки: с 10:00 до 18:00 по московскому времени.</p>
    <p>Время ответа: <br>От 10 минут до 24 часов. В зависимости от сложности проблемы, это время может быть увеличено.</p>
    <p>Не создавайте одинаковые заявки и не дублируйте вопросы по e-mail. <br>Если проблема решена Вами самостоятельно, закройте заявку.</p>
    <form class="new-request__form" @submit.prevent="submitForm">
      <div class="flex ai-c mb-5">
        <b-form-input class="new-request__input small" placeholder="Тема заявки" size="lg"/>
        <b-form-select class="new-request__input small" size="lg" v-model="request.card" :options="cardsList"></b-form-select>
      </div>
      <p class="mb-2">Пожалуйста, постарайтесь сделать описание вашей проблемы конкретным и ясным </p>
      <b-form-textarea
          v-model="request.text"
          placeholder="Опишите вашу проблему"
          rows="3"
          max-rows="4"
          class="mb-3"
      ></b-form-textarea>
      <p>До 5 файлов размером до 5,0 МБ каждый.</p>
      <b-form-file class="mb-5" size="lg" drop-placeholder="Перетащите файлы сюда" :file-name-formatter="formatNames" placeholder="Отсутствуют файлы..."  multiple browse-text="Выберите файлы"  v-model="request.files" accept="image/jpeg, image/png, image/gif"></b-form-file>
      <submit-buttons form-submit confirm-label="Отправить"/>
    </form>
  </div>
</template>

<script>
  export default {
    name: "NewSupportRequest",
    data: () => ({
      request: {
        theme: '',
        card: '',
        text: '',
        files: []
      },
      cardsList: [
        {value: null, text: "Выберите карту"},
        '0000 0000 0000 0000',
        '1111 1111 1111 1111',
        '2222 2222 2222 2222',
        '3333 3333 3333 3333',
        '4444 4444 4444 4444'
      ]
    }),
    methods: {
      submitForm() {
        this.$bvToast.toast(`Ваш запрос успешно добавлен`, {
          variant: 'success',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true
        })
      },
      formatNames(files) {
        this.request.files = this.request.files.filter(el => el.size < 5200000)
        if (this.request.files.length === 1) {
          return this.request.files[0].name
        } else {
          if (this.request.files.length >= 5) {
            this.request.files = this.request.files.slice(0, 5)
            return `${this.request.files.length} файлов выбрано`
          }
          return `${this.request.files.length} файла выбрано`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .new-request {
    &__form {
      width: 100%;
      margin-top: 3em;
    }
    &__input {
      width: 100%;
      position: relative;
      &--placeholder {
        position: absolute;
        left: .9em;
        font-size: 1.5em;
        color: #404040;
        top: calc(50% - 0.7em);
        pointer-events: none;
      }
      &.small {
        width: 31%;
        &:first-child {
          margin-right: 3%;
        }
      }
    }
  }
</style>