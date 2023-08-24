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
      <div v-if="previewUrl">
        <img :src="previewUrl" alt="Preview" style="max-width: 300px; max-height: 300px;">
      </div>

      <input type="file" @change="handleFileChange" accept="image/*">
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button class="button is-link is-light">Cancel</button>
    </div>
  </div>

</form>  

</template>

<script setup>
/* imports */

import { ref, reactive } from 'vue';
import { useStorePets }from '@/stores/storePets'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

/* storage image */

const storage = getStorage();
let storageReference = null;
let file = null;

/* form submit */

const storePets = useStorePets();

const petData = reactive({
    id: '11',
    name: '',
    sexo: 'macho',
    especie: 'cachorro',
    porte: 'pequeno',
    cidade: 'campinas',
    img: '',
    descricao: ''
  })

const onSubmit = () => {
  storageReference = storageRef(storage, `images/${file.name}`);

  uploadBytes(storageReference, file).then((snapshot) => {
    console.log(file);
    console.log('Uploaded a blob or file!');
  })
  .then(
    getDownloadURL(storageReference)
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
      // Or inserted into an <img> element
      petData.img = url
      storePets.addPet(petData)
    })
    .catch((error) => {
      // Handle any errors
    }),

    console.log(petData),
  )
  
}

/* file selected */

const previewUrl = ref(null)

const handleFileChange = (event) => {
  file = event.target.files[0];
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