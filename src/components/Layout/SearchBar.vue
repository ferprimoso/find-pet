<template>
    <!-- Main container -->
<nav class="level">
  <!-- Left side -->
    <div class="level-left">
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



    
  </div>

  <!-- Right side -->
  <div class="level-right">
    <div class="level-item">
      <div class="field has-addons">
        <p class="control">
          <input class="input" type="text" placeholder="Nome do bicho">
        </p>
        <p class="control">
          <button class="button">
            Pesquisar
          </button>
        </p>
      </div>
    </div>
  </div>
</nav>
</template>

<script setup>


</script>