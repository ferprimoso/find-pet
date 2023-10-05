<template>

    <div class="columns">
      <div class="column m-4">
        <div class="image is-4by5 is-relative">
            <img :src="petContent.img"  alt="Pet image">
            <div v-if="petContent.adopted === true" :class="{ 'is-adopted' : petContent.adopted }"> ADOTADO </div>
            <div :class="{ 'is-adopted-bg' : petContent.adopted }"></div>
        </div>
      
      
      
      
      
      </div>




        <!-- <figure class="image column is-relative">
            <img :src="petContent.img"  alt="Pet image">
            <div :class="{ 'is-adopted' : !petContent.adopted }"> ADOTADO </div>
        </figure> -->
        <div class="column content is-medium">
            <h1 >{{ petContent.name }}</h1>
            <p >{{ petContent.sexo }}</p>
            <p >{{ petContent.especie }}</p>
            <p >{{ petContent.cidade }}</p>
            <p > porte: {{ petContent.porte }}</p>
            <p >{{ petContent.descricao }}</p>

        </div>
    </div>

    <pre>  {{ petContent }}</pre>





    <h1 class="title is-4">Responsavel:</h1>

    <RouterLink
            :to="`/userPage/${ userContent.id }`"
            href="#"
          >
    
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="userContent.img" alt="userContent image">
          </figure>
        </div>
    
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4 ">{{ userContent.name }}</p>
              <p class="subtitle is-6">{{ userContent.cidade }}</p>
            </div>
          </div>
        </div>
      </div>
    
    </RouterLink>
<!-- 
    <pre> {{ userContent }}</pre>
    <pre> {{ petContent.ownerEmail }}</pre> -->

    
</template>

<script setup>

/*
imports
*/
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorePets }from '@/stores/storePets'
import { useStoreUserdata } from '@/stores/storeUserdata'

/*
  router
*/

const route = useRoute()
const router = useRouter()



const storePets = useStorePets();
const storeUserdata = useStoreUserdata();


/*
  content
*/

const petContent = ref('')
const userContent = ref('')

petContent.value = storePets.getPetContent(route.params.id)

userContent.value = storeUserdata.getUserContentbyId(petContent.value.ownerId)


/*
  is-adopted
*/

</script>

<style>
.image-container {
  width: 400px;
  height: 600px;
}

.is-adopted {
  height: 10%;
  width: 100%;
  position: absolute;
  bottom: 0px; /* Adjust this value to change the vertical position of the subtitle */
  left: 0px; /* Adjust this value to change the horizontal position of the subtitle */
  background-color: rgb(255, 0, 0, 0.5); /* Background color for the subtitle */
  color: white; /* Text color for the subtitle */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 90%;
  font-weight: bold;
  font-size: 36px; /* Font size for the subtitle */
  z-index: 1;
}

.is-adopted-bg {
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0px; /* Adjust this value to change the vertical position of the subtitle */
  left: 0px; /* Adjust this value to change the horizontal position of the subtitle */
  background-color: black	; /* Background color for the subtitle */
  color: white; /* Text color for the subtitle */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 30%;
}

img {
  width: 100%;
  height: 100%;
}


</style>