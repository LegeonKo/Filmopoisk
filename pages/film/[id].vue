<template>
  <div class="container">
    <div
        class="film"
        v-if="!store.error"
    >
      <div class="film_poster">
        <img
            v-if="store.filmInfo.Poster !== 'N/A'"
            :src="store.filmInfo.Poster"
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
          <div class="film_info__title">{{ store.filmInfo?.Title }}</div>
          <div>Year: {{ store.filmInfo?.Year }}</div>
          <div>imdbID: {{ store.filmInfo?.imdbID }}</div>
          <div>Type: {{ store.filmInfo?.Type }}</div>
          <div>Runtime: {{ store.filmInfo?.Runtime }}</div>
          <div>Genre: {{ store.filmInfo?.Genre }}</div>
          <div>Director: {{ store.filmInfo?.Director }}</div>
          <div>Writer: {{ store.filmInfo?.Writer }}</div>
          <div>Actors: {{ store.filmInfo?.Actors }}</div>
          <div>Plot: {{ store.filmInfo?.Plot }}</div>
          <div>imdbRating: {{ store.filmInfo?.imdbRating }}</div>
          <div>BoxOffice: {{ store.filmInfo?.BoxOffice }}</div>
          <div>Rated: {{ store.filmInfo?.Rated }}</div>
          <div>Released: {{ store.filmInfo?.Released }}</div>
          <div>Country: {{ store.filmInfo?.Country }}</div>
        </div>
        <button
          class="film_info__button"
          @click="goBack"
        >
          Назад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useFilmStore} from "~/store/global.store";

const store = useFilmStore();
const {id} = useRoute().params;

const goBack = () => {
  navigateTo('/')
}

store.filmDetails(id)

</script>

<style lang="sass" scoped>
.container
  padding: 20px
  max-width: 1200px
  margin: 0 auto
  min-height: 1080px
  background: white
</style>