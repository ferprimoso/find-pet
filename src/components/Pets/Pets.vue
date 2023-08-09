<template>

<div class="column is-4">
      <RouterLink
        :to="`/petPage/${ pet.id }`"
        href="#"
      >

  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="pet.img" alt="Pet image">
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4 ">{{ pet.name }}</p>
          <p class="subtitle is-6">{{ pet.cidade }}</p>
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
