<template>
  <section class="feedback">
    <h5 class="mb-3 pt-4 pl-4">Отзывы и оценки</h5>
    <div class="feedback-list pt-3 pl-4 pr-4">
      <div class="feedback-item flex mb-4" v-for="item in feedbackList">
        <div class="feedback-item__img">
          <img src="" alt="">
        </div>
        <div class="feedback-item__info">
          <p class="feedback-item__name m-0">{{item.companyName}}</p>
          <p class="feedback-item__date m-0">{{item.date.toLocaleString().slice(0, -3)}}</p>
          <div class="feedback-item__rate mb-2">
            <span class="feedback-item__star mr-1" :class="{active: index < item.rate}"  v-for="(x, index) in 5">
              <font-awesome-icon :icon="['fas', 'star']"/>
            </span>
          </div>
          <p class="mb-1">{{item.description.slice(0, 42) + '...'}}</p>
          <a href="#" @click.prevent="">Открыть</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Feedback",
    data: () => ({
      feedbackList: [
        {
          companyName: 'Дзедава харчма',
          date: new Date(2019, 2, 2),
          rate: 4,
          description: 'Вчера я был в данном заведении и мне очень понравился там хлеб.'
        },
        {
          companyName: 'Дзедава харчма',
          date: new Date(2019, 2, 2),
          rate: 4,
          description: 'Вчера я был в данном заведении и мне очень понравился там хлеб.'
        },
        {
          companyName: 'Дзедава харчма',
          date: new Date(2019, 2, 2),
          rate: 1,
          description: 'Вчера я был в данном заведении и мне очень понравился там хлеб.'
        },
        {
          companyName: 'Дзедава харчма',
          date: new Date(2019, 2, 2),
          rate: 4,
          description: 'Вчера я был в данном заведении и мне очень понравился там хлеб.'
        }
      ]
    })
  }
</script>

<style lang="scss" scoped>
  .feedback {
    display: flex;
    flex-direction: column;
    height: calc(100% - 4em);
  }
  .feedback-list {
    flex-grow: 1;
    overflow: scroll;
  }
  .feedback-item {
    &__img {
      width: 3em;
      min-width: 3em;
      height: 3em;
      border-radius: 50%;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
      margin-right: 1em;
      padding: 3px;
      background-color: #fff;
    }
    &__name {
      font-weight: 700;
    }
    &__date {
      font-size: .9em;
      color: #999;
    }
    &__star {
      color: #999999;
      font-size: 1.2em;
      &.active {
        color: #ff9600;
      }
    }
  }
</style>