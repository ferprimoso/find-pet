<template>

    <RouterLink
        to="/addPet"
        href="#"
    >
        <button class="button has-background-warning is-large is-fullwidth mb-4">Quero divulgar um animal</button>
    </RouterLink>

    <SearchBar/>

    <div class="columns is-multiline">

        <Pets
        v-for="pet in storePets.pets"
        :key="pet.id"
        :pet="pet"
         />

    </div>

    <Pages/>
</template>

<script setup>

/*
imports
*/

import Pets from '@/components/Pets/Pets.vue';
import Pages from '@/components/Layout/Pages.vue';
import SearchBar from '@/components/Layout/SearchBar.vue';


import { useStorePets }from '@/stores/storePets'



const storePets = useStorePets();



</script>