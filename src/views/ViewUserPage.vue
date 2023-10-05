<template>

    <div class="box is-flex is-justify-content-space-around is-justify-content-center	">
      <div class="profile-picture">
          <img alt="profile picture" :src="userDataContent.img">
        </div>

        <div class="is-flex is-flex-direction-column is-align-content-center is-justify-content-space-around	">
          <h1 class="title is-2 mb-0">{{ userDataContent.name }}</h1>
          <h2 class="subtitle is-4"> {{ userDataContent.state}}, {{ userDataContent.city }}</h2>


          <div>
            <h2 class="subtitle mb-0"> <i class="fa-solid fa-phone"></i> {{ userDataContent.numero }}</h2>          
            <h2 class="subtitle"> <i class="fa-regular fa-envelope"></i> {{ userDataContent.email }}</h2>     
          </div>
       
        </div>
    </div>
       
    <!-- <pre>{{ userDataContent  }}</pre> -->


    <h1 class="title is-4"> {{ userPets.length }} Pets Divulgados</h1>
    <h1 class="title is-4 is-warning"> {{ userPets.length }} Pets Adotados</h1>


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
/* .profile-card {
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
} */


.profile-picture {
  width: 200px; /* Adjust the width and height as needed */
  height: 200px;
  border-radius: 50%; /* This creates a circular shape */
  overflow: hidden; /* This hides the image overflow outside the circle */
  border: 2px solid #fff; /* You can add a border around the image if desired */
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the circular container */
}
</style>
