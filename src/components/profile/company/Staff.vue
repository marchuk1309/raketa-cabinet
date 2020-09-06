<template>
  <form @submit.prevent="submitForm" class="contacts__wrap flex fd-c">
    <b-row class="mb-4">
      <b-col cols="4">
        <b-form-input class="contacts__input" placeholder="Имя и фамилия сотрудника" size="lg"/>
        <multiselect
            class="w-100 mb-4"
            v-model="accessType"
            :options="accessTypes"
            selectedLabel="✔"
            placeholder="Выберите права доступа"
        />
        <b-form-input class="contacts__input" placeholder="E-mail для приглашения" size="lg"/>
        <my-button class="w-100" @click="addEmployee" size="medium" shadow type="squared">Пригласить сотрудника</my-button>
      </b-col>
      <b-col cols="8" class="inputs__field">
        <b-row class="px-4 d-flex ai-c" v-for="(employee, index) in staffData" :key="index">
          <b-col cols="3">{{employee.name}}</b-col>
          <b-col cols="3">{{employee.email}}</b-col>
          <b-col cols="4">
            <multiselect
                class="staff__table--select w-100 mb-0"
                v-model="employee.accessType"
                :options="accessTypes"
                placeholder="Права доступа"
                selectedLabel="✔"
            />
          </b-col>
          <b-col cols="2">
            <a @click.prevent="$bvModal.show(`remove-employee-modal-${index}`)" href="">Уволить</a>
            <b-modal header-close-label hide-footer header-border-variant="white" :id="`remove-employee-modal-${index}`">
                <div class="d-block text-center">
                  <h4 class="mb-5">Вы действительно хотите уволить сотрудника?</h4>
                  <submit-buttons @onCancel="$bvModal.hide(`remove-employee-modal-${index}`)" @onConfirm="removeEmployee(employee, index)" confirm-label="Да"/>
                </div>
            </b-modal>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <submit-buttons form-submit/>
  </form>
</template>

<script>
  import { staffData } from '../../../assets/localData'
  export default {
    name: "CompanyStaffInfo",
    data: () => ({
      accessType: null,
      accessTypes: [
        'Администратор',
        'Кассир',
        'Гость',
        'Ноунейм'
      ],
      staffData
    }),
    methods: {
      submitForm() {
        this.$bvToast.toast(`Данные успешно обновлены`, {
          variant: 'success',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true
        })
      },
      addEmployee() {
        /* TODO: Добавить сотрудника метод */
        this.$bvToast.toast(`Приглашение успешно выслано сотруднику`, {
          variant: 'success',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true
        })
      },
      removeEmployee(employee, index) {
        /* TODO: Удалить сотрудника метод */
        this.$bvModal.hide(`remove-employee-modal-${index}`)
        this.$bvToast.toast(`Сотрудник успешно удален`, {
          variant: 'success',
          solid: true,
          autoHideDelay: 3000,
          appendToast: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contacts {
    &__wrap {
      height: 100%;
      h4 {
        margin-bottom: 1em;
      }
    }
    &__input {
      width: 100%;
      margin-bottom: 1.5rem;
    }
  }
  .inputs__field {
    width: 100%;
    padding: .5rem 0;
    flex-grow: 2;
    margin-right: 0;
    margin-left: 0;
    &--btn {
      background-color: $primary;
      color: #fff;
      border: none;
      width: 24px;
      height: 24px;
      font-size: 10px;
      border-radius: 50%;
      padding: 0;
      margin: 0;
      display: block;
      transition: .3s;
      &:hover {
        background-color: darken($primary, 10%);
      }
    }
    .col-3, .col-4 {
      padding: 0 10px;
    }
    p {
      margin: 0;
    }
  }
</style>

<style lang="scss">
  .staff__table--select {
    .multiselect__tags {
      border: none!important;
      background-color: transparent;
      .multiselect__placeholder {
        font-size: 1rem;
      }
      .multiselect__single {
        font-size: 1rem;
        background-color: transparent;
      }
    }
  }
</style>