<template>
  <div v-if="item" class="flex jc-sb fw-w">
    <div class="flex fd-c">
      <a class="text-primary" href="" @click.prevent="$emit('backToAnswers')"><font-awesome-icon class="mr-2" :icon="['fas', 'chevron-left']"/>Вернуться к списку</a>
      <div class="request-info mb-4 mt-2">
        <h3>Заявка №{{item.requestNumber}}</h3>
        <h4>{{item.requestBody.title}}</h4>
        <hr>
        <p>
          Статус:
          <span style="color: #21af05" v-if="item.requestStatus === 0" class="">Завершена</span>
          <span style="color: #d87413" v-else-if="item.requestStatus === 1" class="">В ожидании</span>
          <span style="color: #ca0d0d" v-else-if="item.requestStatus === 2" class="">Отменена</span>
        </p>
        <p>Специалист:<br> {{item.expertName}}</p>
        <p>Дата создания: <br> {{item.createDate.toLocaleDateString()}}</p>
        <p>Дата закрытия: <br> {{item.closeDate.toLocaleDateString()}}</p>
      </div>
      <my-button v-b-modal.close-request-modal  shadow type="squared">Закрыть заявку</my-button>
    </div>
    <div class="request-dialog">
      <div v-for="(message, index) in messages" :key="index" :class="{'my-message': message.userID === userId}" class="request-message mb-5 flex jc-sb">
        <div class="message-avatar">
          <img src="https://www.aalforum.eu/wp-content/uploads/2016/04/profile-placeholder.png" alt="">
        </div>
        <div class="message-card">
          <h4>{{ message.userID === userId ? fullName : item.expertName }}</h4>
          <p class="time-text">{{messageTime(message.date)}}</p>
          <p>{{message.text}}</p>
          <div class="message-actions" v-if="messages.length - 1 === index && message.userID !== userId && item.requestStatus === 1">
            <a v-b-modal.add-answer-modal>Ответить <font-awesome-icon :icon="['fas', 'reply']"/></a>
            <b-modal
              id="close-request-modal"
              header-close-label
              hide-footer
              header-border-variant="white"
            >
              <div class="d-block text-center">
                <h4 class="mb-5">Вы действительно хотите закрыть заявку?</h4>
                <submit-buttons @onCancel="$bvModal.hide('close-request-modal')" @onConfirm="closeRequest" confirm-label="Закрыть"/>
              </div>
            </b-modal>
            <b-modal
                id="add-answer-modal"
                header-close-label
                hide-footer
                header-border-variant="white"
            >
              <form @submit.prevent="handleSubmit">
                <h4 class="mb-3">Введите сообщение</h4>
                <b-form-group>
                  <b-form-textarea
                      class="mb-3"
                      rows="4"
                      no-resize
                      v-model="newMessage"
                  ></b-form-textarea>
                </b-form-group>
                <p>До 5 файлов размером до 5,0 МБ каждый.</p>
                <b-form-file class="mb-5" size="lg" drop-placeholder="Перетащите файлы сюда" :file-name-formatter="formatNames" placeholder="Отсутствуют файлы..."  multiple browse-text="Выберите файлы"  v-model="newFiles" accept="image/jpeg, image/png, image/gif"></b-form-file>
                <submit-buttons @onCancel="$bvModal.hide('add-answer-modal')" confirm-label="Отправить" form-submit/>
              </form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
    <p class="post-text mt-3 ml-auto">Статус заявки изменен специалистом на «Ожидает ответа пользователя» ДД.ММ.ГГ ЧЧ:ММ <br>
      Статус заявки изменен пользователем на «Закрыта» ДД.ММ.ГГ ЧЧ:ММ</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "SupportRequestItem",
    data: () => ({
      item: null,
      messages: [
        {userID: 1, date: new Date(), text: 'Какое-то там сообщение!'},
        {userID: 2, date: new Date(), text: 'Какой-то там ответ на какое-то сообщение!'},
        {userID: 1, date: new Date(), text: 'Какое-то там сообщение в ответ на ответ на какое-то там сообщение!'},
        {userID: 2, date: new Date(), text: 'Какой-то там ответ на какое-то там сообщениев ответ на ответ на какое-то там сообщение!'},
        {userID: 1, date: new Date(), text: 'Какое-то там сообщение в ответ на ответ на какое-то.... я запутался!'},
        {userID: 2, date: new Date(), text: 'Какое-то там сообщение в ответ на ответ на какое-то.... я запутался!'},
      ],
      newMessage: '',
      newFiles: [],
      newMessageState: null
    }),
    computed: {
      ...mapGetters(['userId', 'fullName']),
    },
    methods: {
      messageTime(date) {
        return date.toLocaleTimeString().slice(0,5)
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
      },
      closeRequest() {
        /* TODO: Закрытие заявки в саппорте */
        this.$store.commit('changeSupportRequestStatus', {id: +this.$route.params.id, status: 0})
        this.$bvModal.hide('close-request-modal')
        this.$bvToast.toast(`Заявка закрыта`, {
          variant: 'success',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true
        })
      },
      handleSubmit() {
        if (this.newMessage.length > 3) {
          this.messages.push({
            userID: this.userId,
            date: new Date(),
            text: this.newMessage
          })
          this.$nextTick(() => {
            this.$bvModal.hide('add-answer-modal')
            this.$bvToast.toast(`Сообщение успешно отправлено! Ожидайте ответа специалиста`, {
              variant: 'success',
              solid: true,
              autoHideDelay: 5000,
              appendToast: true
            })
          })
        }
      },
    },
    mounted(){
      this.item = this.$store.getters.allSupportRequests.find(el => +el.id === +this.$route.params.id)
    }
  }
</script>

<style lang="scss" scoped>
  .request-info {
    background-color: $themeGray;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 2em 1.75em;
    width: 18em;
  }
  .request-dialog {
    width: calc(100% - 18em);
    padding: 2em 2em 0;
    height: 55vh;
    overflow-y: scroll;
    overflow-x: visible;
  }
  .request-message {
    &.my-message {
      flex-direction: row-reverse;
    }
  }
  .message-avatar {
    width: 4em;
    height: 4em;
    min-width: 4em;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    border: 3px solid #ffffff;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .message-card {
    width: calc(100% - 6em);
    background-color: $themeGray;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 1.5em;
  }
  .time-text {
    color: #cccccc;
  }
  .post-text {
    width: calc(100% - 22em);
    font-size: .9em;
  }
  .message-actions {
    a {
      cursor: pointer;
      text-decoration: underline;
      &:first-child {
        color: #23870c;
      }
      &:last-child {
        color: #16b9ff;
      }
    }
  }
</style>