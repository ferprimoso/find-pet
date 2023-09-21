<template>

    <div class="columns">
        <figure class="image column">
            <img :src="petContent.img" alt="Pet image">
        </figure>
        <div class="column content is-medium">
            <h1 >{{ petContent.name }}</h1>
            <p >{{ petContent.sexo }}</p>
            <p >{{ petContent.especie }}</p>
            <p >{{ petContent.cidade }}</p>
            <p > porte: {{ petContent.porte }}</p>
            <p >{{ petContent.descricao }}</p>

        </div>
    </div>

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

    <pre> {{ userContent }}</pre>
    <pre> {{ petContent.ownerEmail }}</pre>

    
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


</script>