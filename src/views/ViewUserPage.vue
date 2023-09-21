<template>


    <div class="columns">
        <figure class="image">
            <img class="profile-image" :src="userDataContent.img">
        </figure>
  
        <pre>{{  userDataContent  }}</pre>


    </div>

    <h1 class="title is-4">Pets Disponibilizados:</h1>

    <div class="columns is-multiline">

    <Pets
    v-for="(pet) in userPets"
    :key="pet.id"
    :pet="pet"
    />

    </div>

</template>

<script setup>

/*
imports
*/
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorePets }from '@/stores/storePets'
import { useStoreUserdata } from '@/stores/storeUserdata'
import { useStoreAuth } from '../stores/storeAuth';
import Pets from '@/components/Pets/Pets.vue';



/*
  router
*/

const route = useRoute()


/* userData content */

const storeUserdata = useStoreUserdata()
const userDataContent = ref('')

userDataContent.value = storeUserdata.getUserContentbyId(route.params.id)

/* user pets */

const storePets = useStorePets();


const userPets = storePets.getUserPets(userDataContent.value.id)
console.log(userPets);
    


</script>

<style>
.profile-card {
  max-width: 400px;
  max-height: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}
</style>
