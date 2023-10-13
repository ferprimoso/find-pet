<template>
    <!-- Main container -->
<nav class="level is-flex-wrap-wrap	mb-2">
  <!-- Left side -->
      <div class="level-item">
          <div class="select">
          <select v-model="filterData.especie">
              <option value="">Todas as espécies</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
          </select>
        </div>
      </div>

      <div class="level-item">
          <div class="select">
          <select v-model="filterData.sexo">
              <option value="">Todas os sexos</option>
              <option value="Femea">Femêa</option>
              <option value="Macho">Macho</option>
          </select>
        </div>
      </div>

      <div class="level-item">
          <div class="select">
          <select v-model="filterData.porte">
              <option value="">Todas os portes</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
          </select>
        </div>
      </div>

      <div class="level-item">
          <div class="select">
            <select v-model="filterData.state">
                        <option value="" > Selecione o Estado</option>
                        <option v-for="estado in brazilCityStates.estados" :key="estado.sigla" :value="estado"> {{ estado.nome }}</option>
            </select>
        </div>
      </div>

      <div class="level-item">
          <div class="select">
            <select v-model="filterData.city" :key="filterData.state.sigla">
                        <option value="" > Selecione a Cidade</option>
                        <option v-for="cidade in filterData.state.cidades" :key="cidade" :value="cidade"> {{ cidade }}</option>
           </select>
        </div>
      </div>
</nav>

<div class="is-flex is-justify-content-space-between px-1 py-0 mb-4">
        <p class="control mr-4 is-flex-grow-1">
          <input v-model="filterData.name" class="input" type="text" placeholder="Nome do animal">
        </p>
        
      <p class="control">
          <button class="button is-warning"
            @click="storePets.performSearch(filterData)"
          >
            Pesquisar
          </button>
        </p>
</div>


</template>

<script setup>

import { ref, reactive } from 'vue'
import { useStorePets }from '@/stores/storePets'
import brazilCityStates from '@/js/citystate.json'

/* pet store*/ 

const storePets = useStorePets();


/* selected state */

const selectedState = ref('');
const selectedCity = ref('');

/* filter data */

const filterData = reactive({
  especie: '',
  sexo: '',
  porte: '',
  state: '',
  city: '',
  name: ''
})

</script>







<style>



</style>