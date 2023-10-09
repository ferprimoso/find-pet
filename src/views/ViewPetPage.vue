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
        <div class="column m-4 content is-medium">
            <h1 class="has-text-warning mb-0">{{ petContent.name }}</h1>
            <span class="subtitle " >{{ petContent.especie }} / {{ petContent.sexo }} / porte {{ petContent.porte }} </span>
            <br>
            <i class="fa-solid fa-location-dot"></i> <span>{{ petContent.cidade }} - {{ petContent.state }} </span>
            <br>
            <p>Disponibilizado por
              <RouterLink
                :to="`/userPage/${ userContent.id }`"
                href="#"
                  >
                      <span >{{ userContent.email }}</span>
              </RouterLink>
              <span> em {{ formattedDate }}</span>
              
            </p>


            <h2 class="has-text-warning title is-4 mb-0">Descrição:</h2>
            <p >{{ petContent.descricao }}</p>

            

            <button class="button is-large is-fullwidth is-warning has-text-white has-text-weight-bold"
                @click.prevent="modals.contact = true"
                href="#"
            >Quero Adotar</button>

        </div>
    </div>

    <ModalContact
              v-if="modals.contact"
              v-model="modals.contact"
              :user="userContent"
    />

<!-- 
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
 -->

    
</template>

<script setup>

/*
imports
*/
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorePets }from '@/stores/storePets'
import { useStoreUserdata } from '@/stores/storeUserdata'
import  ModalContact from '@/components/Pets/ModalContact.vue'

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
  petDate
*/


// Create a new Date object
const petDate = petContent.value.date.toDate();

// Get the day, month, and year components
const day = petDate.getDate().toString().padStart(2, '0');
const month = (petDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based, so we add 1.
const year = petDate.getFullYear();

// Create the formatted date string in "dd/mm/yyyy" format
const formattedDate = `${day}/${month}/${year}`;

/*
  modals
*/

const modals = reactive({
    contact: false
  })



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