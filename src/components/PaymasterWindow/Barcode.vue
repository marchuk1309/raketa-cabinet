<template>
  <div class="barcode-search">
    <span class="barcode-search__reload">
      <font-awesome-icon :icon="['fas', 'redo']"/>
    </span>
    <div class="barcode-search__card card"></div>
    <div class="barcode-search__overlay"></div>
    <div class="barcode-search__frame">
      <img src="../../assets/images/barcode.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Barcode"
  }
</script>

<style scoped lang="scss">
  .barcode-search {
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
      width: 12rem;
      height: 4rem;
      background-color: #fff;
      border: 4px solid $primary;
      z-index: 3;
      left: 40%;
      top: calc(50% - 2rem);
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
</style>