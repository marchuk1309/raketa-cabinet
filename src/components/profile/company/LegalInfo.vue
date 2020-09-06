<template>
  <form @submit.prevent="submitForm" class="private-info">
    <b-row class="mb-4">
      <b-col cols="4">
        <h5 class="mb-3">Основные данные:</h5>
        <b-form-input class="private-info__input" placeholder="Наименование организации" size="lg"/>
        <b-form-input onkeyup="this.value = this.value.replace(/[^A-Za-zА-Яа-яёЁ\s\-]/g,'');" class="private-info__input" placeholder="Должность руководителя" size="lg"/>
        <b-form-input onkeyup="this.value = this.value.replace(/[^A-Za-zА-Яа-яёЁ\s\-]/g,'');" class="private-info__input" placeholder="ФИО руководителя" size="lg"/>
        <multiselect
            class="w-100 mb-4"
            v-model="taxationType"
            :options="taxationTypes"
            selectedLabel="✔"
            placeholder="Вид налогообложения"
        />
        <multiselect
            class="w-100 mb-0"
            v-model="taxRate"
            :options="taxRates"
            selectedLabel="✔"
            placeholder="НДС"
        />
      </b-col>
      <b-col cols="8" class="d-flex fd-c">
        <h5 class="mb-3">Адрес:</h5>
        <b-row>
          <b-col>
            <b-form-input onkeyup="this.value = this.value.replace(/[^\d]/g,'');" class="private-info__input" placeholder="Индекс" size="lg"/>
            <b-form-input onkeyup="this.value = this.value.replace(/[^A-Za-zА-Яа-яёЁ\s\-]/g,'');" class="private-info__input" placeholder="Страна" size="lg"/>
            <b-form-input onkeyup="this.value = this.value.replace(/[^A-Za-zА-Яа-яёЁ\s\-]/g,'');" class="private-info__input" placeholder="Область" size="lg"/>
          </b-col>
          <b-col>
            <b-form-input onkeyup="this.value = this.value.replace(/[^A-Za-zА-Яа-яёЁ\s\-]/g,'');" class="private-info__input" placeholder="Город" size="lg"/>
            <b-form-input class="private-info__input" placeholder="Улица" size="lg"/>
            <b-form-input class="private-info__input" placeholder="Строение" size="lg"/>
          </b-col>
          <b-col>
            <b-form-input class="private-info__input" placeholder="Дом" size="lg"/>
            <b-form-input class="private-info__input" placeholder="Офис" size="lg"/>
          </b-col>
        </b-row>
        <b-row class="inputs__field">
          <b-col cols="5">
            <p>ООО "Божий промысел"</p>
            <p>ИНН: 000 000 000 000</p>
            <p>ОГРН: 000 000 000 000</p>
            <p>КПП: 000 000 000 000</p>
          </b-col>
          <b-col cols="6">
            <p>Наименование банка: Тинькофф</p>
            <p>БИК банка: 044525974</p>
            <p>К/С: 30101810145250000974</p>
            <p>Р/С: 000 000 000 000 000</p>
          </b-col>
          <b-col cols="1" class="d-flex fd-c ai-c jc-sb py-1">
            <button type="button" title="Редактировать" v-b-modal.edit-legal-info-modal class="inputs__field--btn"><font-awesome-icon :icon="['fas', 'pen']"/></button>
            <b-modal header-close-label hide-footer header-border-variant="white" id="edit-legal-info-modal">
              <h4 class="mb-4">Редактировать данные</h4>
              <div class="d-block text-center">
                <div class="modal-form">
                  <b-form-input class="private-info__input" placeholder="Название организации" size="lg"/>
                  <b-form-input class="private-info__input" placeholder="ИНН" size="lg"/>
                  <b-form-input class="private-info__input" placeholder="ОГРН" size="lg"/>
                  <b-form-input class="private-info__input" placeholder="КПП" size="lg"/>
                  <b-form-input class="private-info__input" placeholder="Наименование банка" size="lg"/>
                  <b-form-input class="private-info__input" placeholder="БИК банка" size="lg"/>
                  <b-form-input class="private-info__input" placeholder="К/С" size="lg"/>
                  <b-form-input class="private-info__input" placeholder="Р/С" size="lg"/>
                </div>
                <submit-buttons @onCancel="$bvModal.hide(`edit-legal-info-modal`)" @onConfirm="saveLegalInfo" confirm-label="Сохранить"/>
              </div>
            </b-modal>
            <button type="button" title="Печать" class="inputs__field--btn"><font-awesome-icon :icon="['fas', 'print']"/></button>
            <button type="button" title="Копировать" class="inputs__field--btn"><font-awesome-icon :icon="['fas', 'copy']"/></button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <submit-buttons form-submit/>
  </form>
</template>

<script>
  import moment from 'moment'
  import {taxationTypes, taxRates} from "../../../assets/localData";
  export default {
    name: "PrivateInfo",
    data: () => ({
      taxationType: null,
      taxationTypes,
      taxRate: null,
      taxRates
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
      saveLegalInfo() {
        /* TODO: Сохранить юр. данные о компании */
        this.$bvModal.hide(`edit-legal-info-modal`)
        this.$bvToast.toast(`Данные успешно обновлены`, {
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
  .private-info {
    height: 100%;
    &__inputs {
      width: 100%;
      flex-wrap: wrap;
      font-size: 1.25rem;
    }
    &__input {
      width: 100%;
      margin-bottom: 1.5rem;
      &.small {
        width: 48%;
        margin-bottom: 0;
      }
      &.date-input {
        position: relative;
        .date-val {
          position: absolute;
          left: .9em;
          top: calc(50% - 0.7em);
        }
      }
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
    .col {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    p {
      margin: 0;
    }
  }
</style>

<style lang="scss">
  .private-info .date-input .mx-datepicker{
    width: auto;
    input {
      height: 42.5px!important;
      background: #f7fafc;
      color: #495057;
      font-size: 1.25em;
      &::placeholder {
        color: #6c757d;
      }
    }
  }
</style>