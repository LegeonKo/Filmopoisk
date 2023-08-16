<template>
  <div v-if="!store.error">
    <div
        class="film_wrap"
      v-for="(film, index) in films"
      :key="index"
    >
      <FilmCard
        :Title="film.Title"
        :Year="film.Year"
        :imdbID="film.imdbID"
        :Type="film.Type"
        :Poster="film.Poster"
      />
    </div>
    <Paginator />
  </div>
  <div
      class="search_error"
      v-else>
    {{ store.errorMsg }}
  </div>
</template>

<script setup lang="ts">
import {useFilmStore} from "~/store/global.store";
import Paginator from "~/components/Paginator.vue";

interface Film {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string
}

const store = useFilmStore();

let films: Ref<Film[]> = ref(store.films)

</script>

<style lang="sass" scoped>
  .search_error
    font-size: 24px
    display: flex
    justify-content: center
    padding-top: 20px

  .film_wrap
    margin: 0 20px
    padding: 20px 0
</style>