<template>

    <BackButton/>

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
            <i class="fa-solid fa-location-dot"></i> <span>{{ petContent.city }} - {{ petContent.state }} </span>
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

            
            <div
              v-if="!isAdmin"
            >
              <button class="button is-large is-fullwidth is-warning has-text-white has-text-weight-bold"
                  @click.prevent="modals.contact = true"
                  href="#"
                  v-if="!isPetOwner"
              >Quero Adotar</button>

              <button class="button is-large is-fullwidth is-link has-text-white has-text-weight-bold mb-4"
                  href="#"
                  v-if="isPetOwner"
                  @click.prevent="modals.adopted = true"
              >
              <span v-if="!petContent.adopted">
                Sinalizar como adotado
              </span>
              <span v-if="petContent.adopted">
                Sinalizar como para adoção
              </span>
              
              
              </button>

            
              <button class="button is-large is-fullwidth is-danger has-text-white has-text-weight-bold"
                  href="#"
                  v-if="isPetOwner"
                  @click.prevent="modals.delete = true"
              >Excluir Pet</button>

            </div>

            <div 
              v-if="isAdmin"
            >
              <button class="button is-large is-fullwidth is-warning has-text-white has-text-weight-bold mb-4"
                  href="#"
                  v-if="isPetNotApproved"
                  @click.prevent="modals.approve = true"
              >Aprovar Pet</button>


              <button class="button is-large is-fullwidth is-danger has-text-white has-text-weight-bold"
                  href="#"
                  @click.prevent="modals.delete = true"
              >Excluir Pet</button>





            </div>
            

        </div>
    </div>

    <ModalContact
              v-if="modals.contact"
              v-model="modals.contact"
              :user="userContent"
    />

    <ModalDeletePet
             v-if="modals.delete"
            v-model="modals.delete"
            :pet="petContent"
    />

    <ModalAdopted
             v-if="modals.adopted"
            v-model="modals.adopted"
            :pet="petContent"
    />

    <ModalApprovePet
              v-if="modals.approve"
              v-model="modals.approve"
              :pet="petContent"
    />


</template>

<script setup>

/*
imports
*/
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorePets }from '@/stores/storePets'
import { useStoreUserdata } from '@/stores/storeUserdata'
import { useStoreAuth } from '@/stores/storeAuth'
import ModalContact from '@/components/Pets/ModalContact.vue'
import ModalDeletePet from '@/components/Pets/ModalDeletePet.vue'
import ModalAdopted from '../components/Pets/ModalAdopted.vue'
import ModalApprovePet from '@/components/Pets/ModalApprovePet.vue'
import BackButton from '@/components/Layout/BackButton.vue'

/*
  router
*/

const route = useRoute()
const router = useRouter()



const storePets = useStorePets();
const storeUserdata = useStoreUserdata();
const storeAuth = useStoreAuth();


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
    contact: false,
    delete: false,
    adopted: false,
    approve: false
  })

/* is current user pet */

const isPetOwner = computed(() => {
  if ( userContent.value.email === storeAuth.getAuthEmail) {
    return true
  } else {
    return false
  }
})

/* is current admin  */

const isAdmin = computed(() => {
  if ( storeUserdata.getAdminbyEmail(storeAuth.user.email) ) {
    return true
  } else {
    return false
  }
})

/* is pet not approved */

const isPetNotApproved = computed(() => {
  if ( petContent.value.aproved === false ) {
    return true
  } else {
    return false
  }
})


  

// })
console.log(userContent.value.email);
console.log(storeAuth.getAuthEmail);


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