<template>

    <BackButton class="mb-4"/>


    <div class="box is-flex is-justify-content-space-around is-justify-content-center	">

        <div class="is-flex is-flex-direction-column is-align-content-center is-justify-content-space-around	">
          <h1 class="title is-2 mb-0"> Dashboard de Administrador </h1>

        </div>
    </div>
           
    <div class="mb-4 is-flex is-justify-content-center">
      <h1 class="title is-4 has-text-weight-normal"> 
      <span class="has-text-warning">  {{ }} </span>
      Pets Esperando aprovação:
      </h1>
    </div>
  

    <div class="columns is-multiline">
      <div
        v-if="!storePets.pets.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        Nenhum animal pendente de aprovação...
    </div>

    <Pets
    @click.prevent=""
    v-for="(pet) in unapprovedPets"
    :key="pet.id"
    :pet="pet"
    />

    </div>
    
</template>

<script setup>

/*
imports
*/
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStorePets }from '@/stores/storePets'
import { useStoreUserdata } from '@/stores/storeUserdata'
import Pets from '@/components/Pets/Pets.vue';
import BackButton from '@/components/Layout/BackButton.vue'


/* onMounted */
const storePets = useStorePets();


/*
  router
*/

const route = useRoute()


/* userData content */

const storeUserdata = useStoreUserdata()


/* unapproved pets */
const unapprovedPets = computed(() => {
    storePets.getUnapproved()
    return storePets.pets
}) 
</script>

