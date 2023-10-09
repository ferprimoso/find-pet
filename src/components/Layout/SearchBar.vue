<template>
    <!-- Main container -->
<nav class="level is-flex-wrap-wrap	">
  <!-- Left side -->
      <div class="level-item">
          <div class="select">
          <select>
              <option>Todas as espécies</option>
              <option>Cachorro</option>
              <option>Gato</option>
          </select>
        </div>
      </div>

      <div class="level-item">
          <div class="select">
          <select>
              <option>Todas os sexos</option>
              <option>Femêa</option>
              <option>Macho</option>
          </select>
        </div>
      </div>

      <div class="level-item">
          <div class="select">
          <select>
              <option>Todas os portes</option>
              <option>Pequeno</option>
              <option>Médio</option>
              <option>Grande</option>
          </select>
        </div>
      </div>

      <div class="level-item">
          <div class="select">
            <select v-model="selectedState">
                        <option value="" disabled selected> Selecione o Estado</option>
                        <option v-for="estado in brazilCityStates.estados" :key="estado.sigla" :value="estado"> {{ estado.nome }}</option>
            </select>
        </div>
      </div>

      <div class="level-item">
          <div class="select">
            <select v-model="selectedCity" :key="selectedState.sigla">
                        <option value="" disabled selected> Selecione a Cidade</option>
                        <option v-for="cidade in selectedState.cidades" :key="cidade" :value="cidade"> {{ cidade }}</option>
           </select>
        </div>
      </div>

  <!-- Right side -->
    <div class="level-item ">
      <div class="field is-flex-grow-1">
        <p class="control">
          <input class="input" type="text" placeholder="Nome do bicho">
        </p>
        
      </div>
    </div>

    <div class="level-item" >
      <p class="control">
          <button class="button is-warning"
            @click=""
          >
            Pesquisar
          </button>
        </p>
    </div>

</nav>
</template>

<script setup>

import { ref } from 'vue'
import { useStorePets }from '@/stores/storePets'
import brazilCityStates from '@/js/citystate.json'

/* pet store*/ 

const storePets = useStorePets();


/* selected state */

const selectedState = ref('');
const selectedCity = ref('');


</script>







<style>



</style>