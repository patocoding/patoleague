<script setup>
import { storeToRefs } from 'pinia'

const inputVal = ref('')

const filtersStore = useFiltersStore()
const { addValueToFilterList } = filtersStore
const { filtersList } = storeToRefs(filtersStore)
</script>

<template>
  <div>
    {{ filtersList }}
    <input v-model="inputVal" />
    <button @click="addValueToFilterList(inputVal)">+</button>
  </div>
</template>