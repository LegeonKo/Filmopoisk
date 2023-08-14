<template>
  <header>
    <nav class="nav">
      <NuxtLink class="logo" to="/" external>Filmopoisk</NuxtLink>

      <div class="search_form">
        <input
            v-model="searchValue"
            class="search_input"
            type="search"
            @keydown.enter="store.searchFilm(searchValue); clearSearch()"
        >
        <button
            @click="store.searchFilm(searchValue); clearSearch()"
            class="search_button"
        >
          Поиск
        </button>
      </div>
    </nav>
  </header>

  <main class="container">
    <slot />
  </main>

  <footer class="footer">
    <p>&copy; {{ new Date().getFullYear() }}</p>
  </footer>
</template>

<script setup lang="ts">
import {useFilmStore} from "~/store/global.store.ts";

const searchValue = ref('');
const store = useFilmStore();

const clearSearch = () => {
  searchValue.value = ''
}

</script>

<style lang="sass" scoped>
.container
  background-color: black
  min-height: 1080px

.nav
  position: sticky
  top: 0
  left: 0
  right: 0
  height: 70px
  padding-left: 10px
  padding-right: 10px
  background-color: cornflowerblue
  color: white
  display: flex
  justify-content: space-between
  align-items: center
  gap: 10px


.search_form
  display: flex
  align-items: center
  width: 100%
  gap: 10px

  .search_input
    width: 100%
    height: 50px
    border-radius: 10px
    border: 1px solid white
    padding-left: 10px
    padding-right: 10px
    font-size: 20px

  .search_button
    font-size: 16px
    height: 50px
    width: 7%
    border: 1px solid #3a8843
    border-radius: 15px
    background: #4cc559
    color: #fff
    cursor: pointer

  .search_button:hover
    background: #37b644

.logo
  text-decoration: none
  color: white
  font-size: 24px

.footer
  background-color: cornflowerblue
  color: white
  display: flex
  height: 80px
  justify-content: center
  align-items: center

</style>