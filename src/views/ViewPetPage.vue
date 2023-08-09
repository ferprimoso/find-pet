<template>

    <div class="columns">
        <figure class="image column">
            <img :src="petContent.img" alt="Pet image">
        </figure>
        <div class="column">
            <h1 class="title is-1">{{ petContent.name }}</h1>
            <h1 class="title is-1">{{ petContent.sexo }}</h1>
            <h1 class="title is-1">{{ petContent.especie }}</h1>
            <h1 class="title is-1">{{ petContent.cidade }}</h1>
            <h1 class="title is-1">{{ petContent.porte }}</h1>
            <h1 class="title is-1">{{ petContent.descricao }}</h1>

        </div>
    </div>
    
</template>

<script setup>

/*
imports
*/
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStorePets }from '@/stores/storePets'

/*
  router
*/

const route = useRoute()
const router = useRouter()



const storePets = useStorePets();

/*
  note
*/

const petContent = ref('')

petContent.value = storePets.getPetContent(route.params.id)


</script>