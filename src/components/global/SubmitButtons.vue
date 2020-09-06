<template>
  <div class="submit-buttons flex ai-c jc-fe">
    <my-button @click="$emit('onCancel')" color="transparent" size="large">{{cancelLabel}}</my-button>
    <my-button :event-type="formSubmit !== undefined ? 'submit' : 'button'" @click="$emit('onConfirm')" size="large">{{confirmLabel}}</my-button>
  </div>
</template>

<script>
  export default {
    name: "SubmitButtons",
    props: {
      cancelLabel: {
        type: String,
        default: 'Отмена'
      },
      confirmLabel: {
        type: String,
        default: 'Сохранить'
      },
      formSubmit: {}
    }
  }
</script>

<style lang="scss" scoped>
  .submit-buttons {
    width: 100%;
    margin-top: auto;
  }
</style>