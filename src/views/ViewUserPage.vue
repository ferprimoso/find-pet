<template>


    <div class="columns">
        <figure class="image column">
            <img class="profile-image" :src="userDataContent.img">
        </figure>
        <div class="column content is-medium">

        </div>

        <div class="column">
          <pre>{{  userDataContent  }}</pre>
        
        
        
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
import { useStoreUserdata } from '@/stores/storeUserdata'


/* userData content */

const storeUserdata = useStoreUserdata()
const userDataContent = ref('')

userDataContent.value = storeUserdata.getUserdataContent('id3')


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
