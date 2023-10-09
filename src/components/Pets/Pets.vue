<template>

<div class="column is-4">
      <RouterLink
        :to="`/petPage/${ pet.id }`"
        href="#"
      >

  <div class="card">
    <div class="card-image ">
      <figure class="image is-4by3 is-relative">
        <img :src="pet.img" alt="Pet image">
        <div v-if="pet.adopted === true" :class="{ 'pet-is-adopted' : pet.adopted }"> ADOTADO </div>
        <!-- <div :class="{ 'pet-is-adopted-bg' : pet.adopted }"></div> -->

      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4 has-text-warning has-text-weight-bold">{{ pet.name }}</p>
          <p class="subtitle is-6">{{ pet.cidade }}, {{ pet.state }}</p>
        </div>
      </div>
    </div>
  </div>

</RouterLink>

</div>


</template>

<script setup>

/*
  props
*/

const props = defineProps({
    pet: {
      type: Object,
      required: true  
    }
})

</script>

<style>

.pet-is-adopted {
  height: 20%;
  width: 100%;
  position: absolute;
  bottom: 0px; /* Adjust this value to change the vertical position of the subtitle */
  left: 0px; /* Adjust this value to change the horizontal position of the subtitle */
  background-color: rgb(255, 0, 0, 0.5); /* Background color for the subtitle */
  color: white; /* Text color for the subtitle */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 28px; /* Font size for the subtitle */
  z-index: 1;
}

.pet-is-adopted-bg {
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



</style>