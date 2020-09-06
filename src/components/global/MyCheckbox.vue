<template>
  <div class="my-checkbox">
    <input
        @change="onChange(!value)"
        class="my-checkbox__input"
        :class="{active: value}, size"
        type="checkbox"

    >
    <div class="my-checkbox__div"></div>
  </div>
</template>

<script>
  export default {
    name: "MyCheckbox",
    props: [
      "size",
      "value"
    ],
    methods: {
      onChange(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>

<style scoped lang="scss">
  .my-checkbox {
    position: relative;
    &__input {
      position: relative;
      width: 15px;
      height: 15px;
      opacity: 0;
      z-index: 2;
      cursor: pointer;
      margin-right: 5px;
      &.active {
        & + .my-checkbox__div::after {
          background-color: $primary;
        }
      }
    }
    &__div {
      position: absolute;
      left: 0;
      top: calc(50% - 8px);
      width: 16px;
      height: 16px;
      border-radius: 3px;
      border: 1px solid #ced4da;
      z-index: 1;
      &::after {
        content: '';
        position: absolute;
        left: 2px;
        top: 2px;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        z-index: 1;
      }
    }
  }
</style>