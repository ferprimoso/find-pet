<template>

<form 
  @submit.prevent="onSubmit"
>
  <div class="field">
    <label class="label">Nome</label>
    <div class="control">
      <input v-model="petData.name" class="input" type="text" placeholder="Digite o nome do animal">
    </div>
  </div>

  <div class="field">
    <label class="label">Sexo</label>
    <div class="control">
      <div class="select">
        <select v-model="petData.sexo">
          <option value="macho">Macho</option>
          <option value="femea">Femêa</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">Espécie</label>
    <div class="control">
      <div class="select">
        <select v-model="petData.especie">
          <option value="cachorro">Cachorro</option>
          <option value="gato">Gato</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">Porte</label>
    <div class="control">
      <div class="select">
        <select v-model="petData.porte">
          <option value="pequeno">Pequeno</option>
          <option value="medio">Médio</option>
          <option value="grande">Grande</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">Descrição</label>
    <div class="control">
      <textarea class="textarea" placeholder="Descreva o pet" v-model="petData.descricao"></textarea>
    </div>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button class="button is-link is-light">Cancel</button>
    </div>
  </div>

  <div class="field is-grouped">
      <div v-if="previewUrl">
        <img :src="previewUrl" alt="Preview" style="max-width: 300px; max-height: 300px;">
      </div>

      
      <input type="file" @change="handleFileChange" accept="image/*">
  </div>
</form>  

</template>

<script setup>
/* imports */

import { ref, reactive } from 'vue';
import { useStorePets }from '@/stores/storePets'


/* form submit */

const storePets = useStorePets();

const petData = reactive({
    id: '11',
    name: '',
    sexo: 'macho',
    especie: 'cachorro',
    porte: 'pequeno',
    cidade: 'campinas',
    img: 'src/assets/20200407_130345.jpg',
    descricao: ''
  })

const onSubmit = () => {
  console.log(petData)
  storePets.addPet(petData)
}

/* file selected */

const previewUrl = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewImage(file);
  }
};

const previewImage = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    previewUrl.value = reader.result;
  };
  reader.readAsDataURL(file);
};

</script>