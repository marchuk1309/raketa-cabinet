<template>
  <button :type="eventType" @click="$emit('click')" class="my-btn" :class="[color, type, size, {shadowed: shadow}]">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "MyButton",
    props: {
      color: {
        type: String,
        default: 'primary'
      },
      shadow: Boolean,
      icon: {},
      type: {
        type: String,
        default: 'round'
      },
      size: {
        type: String
      },
      eventType: {
        default: 'button',
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-btn {
    transition: .3s;
    padding: 0 1em;
    background: none;
    border: none;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.primary {
      background: $primaryGrag;
      color: #ffffff;
      &.shadowed {
        box-shadow: 0 10px 20px rgba(16, 189, 254, 0.3);
        &:hover {
          box-shadow: none;
        }
      }
    }
    &.orange {
      background: $orangeGrad;
      color: #fff;
      &.shadowed {
        box-shadow: 0 10px 20px rgba(255, 128, 22, 0.3);
        &:hover {
          box-shadow: none;
        }
      }
    }
    &.white {
      background-color: transparent;
      border: 1px solid #eeeeee!important;
    }
    &:not(.unactive) {
      border: none;
    }
    &.unactive {
      background: $themeGray;
      border: 1px solid #eee;
    }
    &.transparent {
      background: none;
      border: 1px solid transparent;
    }
    &__icon {
      margin-right: .5em;
      &.big {
        font-size: 1.5em;
        margin-right: .3em;
      }
    }
    &.squared {
      border-radius: 3px;
    }
    &.round {
      border-radius: 1.75em;
    }
    &.large {
      font-size: 1.4em;
      padding: 0 1.5em;
      height: 55px;
      line-height: 55px;
    }
    &.medium {
      font-size: 1.25rem;
      padding: 0 1.5rem;
      height: 42.5px;
      line-height: 42.5px;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
  }
</style>