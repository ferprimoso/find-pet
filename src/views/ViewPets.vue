<template>

    <RouterLink
        :to="!storeAuth.user.id ? '/auth' : '/addPet'"
        href="#"
    >
        <button class="button is-warning is-large is-fullwidth mb-4">Quero divulgar um animal</button>
    </RouterLink>

    <SearchBar/>

    <div class="columns is-multiline">
        <progress
          v-if="!storePets.petsLoaded"
          class="progress is-large is-success"
          max="100"
        />
          
        <Pets
        v-for="(pet, index) in paginatedPets"
        :key="pet.id"
        :pet="pet"
         />

         
    </div>

    <div
        v-if="!storePets.pets.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        Nenhum animal encontrado...
    </div>


    <div class="columns is-centered is-mobile mt-4">
        <vue-awesome-paginate
            :total-items="storePets.pets.length"
            :items-per-page="6"
            :max-pages-shown="5"
            v-model="currentPage"
        />
    </div>
    


</template>

<script setup>

/*
imports
*/

import { ref, computed, onMounted } from "vue";
import Pets from '@/components/Pets/Pets.vue';
import SearchBar from '@/components/Layout/SearchBar.vue';
import { useStoreAuth } from '@/stores/storeAuth'
import { useStorePets }from '@/stores/storePets'

const storePets = useStorePets();
const storeAuth = useStoreAuth();

/* pagination logic */

const petsPerPage = 6;
const currentPage = ref(1);


const paginatedPets = computed(() => {
      const startIndex = (currentPage.value - 1) * petsPerPage;
      const endIndex = startIndex + petsPerPage;
      return storePets.pets.slice(startIndex, endIndex);
    });

/* isLogged */

const isLogged = false;

/* on mounted */

onMounted(() => {
  storePets.getPets()
})

</script>


<style>
  .pagination-container {
    display: flex;
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    cursor: pointer;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(217, 217, 217);
    color: black;
  }
  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }
  .active-page {
    background-color: #3498db;
    border: 1px solid #3498db;
    color: white;
  }
  .active-page:hover {
    background-color: #2988c8;
  }
</style>