<template>
  <div class="film">
    <div class="film_poster">
      <img
          v-if="Poster !== 'N/A'"
          :src="Poster"
          class="film_poster__img"
          alt="Poster"
      >
      <img
        v-else
        src="/img/image.jpg"
        class="film_poster__img"
      >
    </div>
    <div class="film_info__wrap">
      <div class="film_info">
        <div class="film_info__title">{{ Title }}</div>
        <div>Year: {{ Year }}</div>
        <div>imdbID: {{ imdbID }}</div>
        <div>Type: {{ Type }}</div>
      </div>
      <button
          class="film_info__button"
          @click="store.filmDetails(imdbID)"
      >Подробнее
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useFilmStore} from "~/store/global.store";

const props = defineProps({
  Title: String,
  Year: String,
  imdbID: String,
  Type: String,
  Poster: String
})

const store = useFilmStore();


</script>

<style lang="sass">

.film
  display: flex
  border: 1px solid black
  border-radius: 20px
  padding: 30px
  min-height: 500px
  box-shadow: 0 0 7px 0 inset black

  &_poster
    display: flex
    justify-content: center
    align-items: center
    border: 1px solid black
    padding: 5px
    border-radius: 5px
    background: #8493a8

    &__img
      width: 300px


  &_info__wrap
    display: flex
    flex-direction: column
    justify-content: space-between
    padding-top: 10px
    padding-bottom: 20px
    font-size: 20px
    margin-left: 20px

    .film_info
      display: flex
      flex-direction: column
      gap: 10px

      &__title
        font-size: 32px
        font-weight: bold
        margin-bottom: 20px

      &__button
        margin-top: 20px
        height: 50px
        border: 1px solid #3a8843
        border-radius: 10px
        font-size: 20px
        background: #4cc559
        color: white
        cursor: pointer
        flex-grow: 0
        width: 200px

        &:hover
          background: #37b644

</style>