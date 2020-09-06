<template>
  <div>
    <b-table
        v-if="items"
        @row-clicked="onRowSelected"
        select-mode="single"
        sticky-header
        no-select-on-click
        hover
        :fields="fields"
        :items="items"
        responsive="sm"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
    >
      <!-- A virtual column -->
      <template v-slot:cell(requestNumber)="data">
        №{{ data.item.requestNumber }}
      </template>

      <template v-slot:cell(requestBody)="data">
        <p class="mb-0">{{ data.value.title }}</p>
        <p class="mb-0">{{ data.value.text }}</p>
      </template>

      <template v-slot:cell(card)="data">
        {{ data.value }}
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(userStatus)="data">
        {{ data.item.userStatus }}
      </template>

      <!-- A virtual composite column -->
      <template v-slot:cell(requestStatus)="data">
        <span style="color: #21af05" v-if="data.item.requestStatus === 0" class="">Завершена</span>
        <span style="color: #d87413" v-else-if="data.item.requestStatus === 1" class="">В ожидании</span>
        <span style="color: #ca0d0d" v-else-if="data.item.requestStatus === 2" class="">Отменена</span>
      </template>
    </b-table>
    <p v-else class="text-center">Заявок нет. <a class="link" @click.prevent="$emit('createRequest')">Создать</a></p>
  </div>
</template>

<script>
  export default {
    name: "SupportAnswers",
    data: () => ({
      fields: [
        {key: 'requestNumber', sortable: true, label: 'Номер'},
        {key: 'requestBody', sortable: true, label: 'Заявка', formatter: value => {
            const newObj = {
              title: value.title,
              text: value.text.slice(0, 30) + '...'
            }
            return newObj
          }
        },
        {key: 'card', sortable: true, label: 'Карта', formatter: value => {
            let newString = value.slice(0, 5) + '...'
            newString += value.slice(-5)
            return newString
          }
        },
        {key: 'userStatus', sortable: true, label: 'Статус пользователя'},
        {key: 'requestStatus', sortable: true, label: 'Статус заявки'}
      ],
      sortBy: 'requestNumber',
      sortDesc: true
    }),
    computed: {
      items() {
        return this.$store.getters.allSupportRequests
      }
    },
    methods: {
      onRowSelected(item) {
        console.log('Клик')
        this.$emit('openRequestDialog', item.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link {
    text-decoration: underline;
    cursor: pointer;
  }
</style>