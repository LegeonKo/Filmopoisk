
<template>
  <head>
    <title>Filmopoisk</title>
  </head>
  <div class="container">
    <FilmList/>
  </div>

</template>

<script setup lang="ts">
import {onBeforeMount} from "#imports";
import {useFilmStore} from "~/store/global.store";

const route = useRoute();
const store = useFilmStore();

onBeforeMount(async () => {
  const { s, page } = route.query
  if(s) {
    await store.searchFilm(s, page);
  }
})

watch(
    () => route.fullPath,
    () => {
        store.searchFilm(route.query.s, route.query.page)
    }
);

</script>

<style lang="sass" scoped>
  .container
    margin: 0 auto
    min-height: 1080px
    max-width: 1200px
    background-color: white
</style>