<template>
<div class="level-item">
          <div class="select">
          <select>
              <option>Todas as espécies</option>
              <option>Cachorro</option>
              <option>Gato</option>
          </select>
        </div>
      </div>

</template>

<script  setup>
/*  imports */
import { ref } from 'vue'


/* dropdown */
const showDropdown = ref(false)


</script>