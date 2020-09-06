<template>
  <div class="qrcode-search">
    <span class="qrcode-search__reload">
      <font-awesome-icon :icon="['fas', 'redo']"/>
    </span>
    <div class="qrcode-search__card card"></div>
    <div class="qrcode-search__overlay"></div>
    <div class="qrcode-search__frame">
      <img src="../../assets/images/qrcode.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Qrcode"
  }
</script>

<style scoped lang="scss">
  .qrcode-search {
    position: relative;
    height: 100%;
    &__card {
      position: absolute;
      width: 60%;
      height: 14rem;
      left: 20%;
      top: calc(50% - 7rem);
      background-color: #01acfc;
      border-radius: 14px;
    }
    &__overlay {
      left: 0;
      top: 0;
      position: absolute;
      border-radius: 3px;
      background-color: rgba(#23252f,.91);
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    &__reload {
      position: absolute;
      color: #ffffff;
      z-index: 3;
      left: auto;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    &__frame {
      position: absolute;
      width: 8rem;
      height: 8rem;
      background-color: #fff;
      border: 4px solid $primary;
      z-index: 3;
      left: 50%;
      top: calc(50% - 4rem);
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
</style>