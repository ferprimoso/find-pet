<template>
    <NavBar/>


    <div class="container is-max-desktop px-2 py-4">
        <RouterView/>
    </div>

</template>

<script setup>
import { useStorePets }from '@/stores/storePets'
import { useStoreUserdata } from '@/stores/storeUserdata'
import { onMounted } from 'vue';
import NavBar from '@/components/Layout/NavBar.vue'
import { useStoreAuth } from '@/stores/storeAuth'



/*
  store
*/
const storePets = useStorePets()
const storeUserdata = useStoreUserdata()
const storeAuth = useStoreAuth()

/*
  mounted
*/

  onMounted(() => {
    storeAuth.init()
    storePets.init()
    storeUserdata.init()
  })


</script>


<style>
@import 'bulma/css/bulma.min.css';
@import 'node_modules/@fortawesome/fontawesome-free/css/all.min.css';
@import url('https://fonts.googleapis.com/css2?family=Itim&family=Roboto&display=swap');

</style>
