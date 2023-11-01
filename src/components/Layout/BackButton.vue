<template>
   <button class='ml-4 button is-warning' @click="goBack">
        <i class="fa-solid fa-arrow-left"></i>Voltar</button>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()


const goBack = () => {
    console.log(1)
    router.back()
}


</script>

