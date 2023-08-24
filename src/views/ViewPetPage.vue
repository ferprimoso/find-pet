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