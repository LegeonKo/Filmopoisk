<template>
  <div
      class="paginator"
  >
    <NuxtLink
        class="paginator__link border_right"
        v-if="currentPage > 3 && pagesArr.length > 0"
        :to="`/?s=${store.searchValue}&page=1`"
        external
    >
      1
    </NuxtLink>
    <div class="paginator__wrap">
      <NuxtLink
          class="paginator__link"
          v-for="(page, index) in pagesArr"
          :key="index"
          :to="`/?s=${store.searchValue}&page=${page}`"
          :class="{ 'paginator__link_active': page == currentPage }"
          external
      > {{ page }}
      </NuxtLink>
    </div>
    <NuxtLink
        class="paginator__link"
        :to="`/?s=${store.searchValue}&page=${currentPage+1}`"
        v-if="pagesArr.length > 0 && currentPage !== store.pages"
        external
    >
      »
    </NuxtLink>
  </div>

</template>

<script setup lang="ts">
import {useFilmStore} from "~/store/global.store";
import {toNumber} from "@vue/shared";

const store = useFilmStore();
const route = useRoute();
const pagesArr = ref([]);
let currentPage = ref(toNumber(route.query.page));

const pagination = (item) => {
  pagesArr.value.splice(0, pagesArr.value.length);

  for (let i = 1; i <= item; i++) {
    pagesArr.value.push(i)
  }

  const totalPages = pagesArr.value.length

    if (currentPage.value === totalPages) {
      pagesArr.value.length = currentPage.value + (totalPages - currentPage.value);
      pagesArr.value.splice(0, currentPage.value - (totalPages - currentPage.value + 5));
      return;
    }

    if (currentPage.value === totalPages - 1) {
      pagesArr.value.length = currentPage.value + (totalPages - currentPage.value);
      pagesArr.value.splice(0, currentPage.value - (totalPages - currentPage.value + 3));
      return;
    }

    if (currentPage.value > 3) {
      pagesArr.value.length = currentPage.value + 2;
      pagesArr.value.splice(0, currentPage.value - 3)
      return;
    }

      pagesArr.value.splice(5)
      return;
}

watch(
  () => route.query.page,
  () => {
    currentPage.value = route.query.page;
  }
)


watch(
  () => store.pages,
  (newPages) => {
    pagination(newPages)
  }
)


</script>

<style lang="sass" scoped>
.paginator
  display: flex
  gap: 20px
  justify-content: center
  padding-bottom: 20px
  margin-left: 20px
  margin-right: 20px

  .border_right
    border-right: 1px solid black

  &__wrap
    display: flex

  &__link
    display: flex
    justify-content: center
    align-items: center
    flex-shrink: 0
    width: 40px
    height: 40px
    border: 1px solid black
    text-decoration: none
    color: black
    border-right: none

    &:last-child
      border-right: 1px solid black

    &_active
      background: #e0e0e0
      cursor: default

</style>