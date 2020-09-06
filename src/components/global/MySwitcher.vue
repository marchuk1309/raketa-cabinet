<template>
  <div
      :class="[{boolean: isBoolean !== undefined, active: isBoolean !== undefined && value}, size]"
      class="my-switcher"
      @click="onChange(!value)"
  >
    <div :class="{active: value}" class="circle"></div>
    <button
        type="button"
        class="off"
        :class="{active: !value}"
    >{{val1 || ''}}</button>
    <button
        type="button"
        class="on"
        :class="{active: value}"
    >{{val2 || ''}}</button>
  </div>
</template>

<script>
  export default {
    name: "MySwitcher",
    props: [
      "val1",
      "val2",
      "value",
      "isBoolean",
      "size"
    ],
    methods: {
      onChange(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-switcher {
    cursor: pointer;
    width: fit-content;
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    background: $primaryGrag;
    border-radius: 20px;
    &.boolean:not(.active) {
      background: linear-gradient(to right, #6f6f6f 0%, #989898 100%);
    }
    &.small {
      height: 30px;
      button {
        height: 20px;
        width: 20px;
      }
      .circle {
        height: 20px;
        width: 20px;
        &.active {
          left: calc(100% - 25px);
        }
      }
    }
    &.extra-small {
      height: 24px;
      width: 50px;
      button {
        height: 18px;
        width: 18px;
      }
      .circle {
        left: 3px;
        top: 3px;
        height: 18px;
        width: 18px;
        &.active {
          left: calc(100% - 21px);
        }
      }
    }
    button {
      font-size: 12px;
      transition: .4s;
      margin: 5px;
      line-height: 30px;
      text-align: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: transparent;
      border: none;
      color: #ffffff;
      z-index: 1;
      &.active {
        color: $primary;
      }
    }
    .circle {
      position: absolute;
      transition: .2s;
      top: 5px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      background-color: #fff;
      left: 5px;
      &.active {
        left: calc(100% - 35px);
      }
    }
  }
</style>