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
          <option value="Macho">Macho</option>
          <option value="Femea">Femêa</option>
        </select>
      </div>
    </div>
  </div>

  <div class="field">
    <label class="label">Espécie</label>
    <div class="control">
      <div class="select">
        <select v-model="petData.especie">
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
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


  <figure class="image is-256x256 mb-4" v-if="previewUrl">
      <img :src="previewUrl" alt="Preview" style="max-width: 300px; max-height: 300px;">
  </figure>

  <div class="field is-grouped">
  
      <div class="file is-warning">
        <label class="file-label">
          <input class="file-input" type="file" @change="handleFileChange" accept="image/*">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Escolha uma imagem...
            </span>
          </span>
          <!-- <span class="file-name">
          </span> -->
        </label>

      </div>
  </div>

  <div class="field is-grouped mt-5">
    <div class="control">
      <button class="button is-link">Postar</button>
    </div>
    <div class="control">
      <button class="button is-link is-light">Cancelar</button>
    </div>
  </div>

</form>  

</template>

<script setup>
/* imports */

import { ref, reactive } from 'vue';
import { useStorePets }from '@/stores/storePets'
import { useStoreAuth }from '@/stores/storeAuth'
import { useStoreUserdata } from '@/stores/storeUserdata'
import { storage } from '@/js/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useRouter } from 'vue-router'


const router = useRouter()

/* storage image */

// let storageReference = null;
let file = null;

/* form submit */
const storeAuth = useStoreAuth();
const storeUserdata = useStoreUserdata();
const storePets = useStorePets();

const petData = reactive({
    ownerId: '',
    name: '',
    date: '',
    sexo: 'Macho',
    especie: 'Cachorro',
    porte: 'pequeno',
    state: '',
    city: '',
    img: '',
    descricao: '',
    adopted: false,
    aproved: false
  })

const setProgresspercent = ref(0);

const onSubmit = (e) => {
  e.preventDefault()

    if (!file) return;

    const storageReference = storageRef(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent.value = progress;
        console.log(setProgresspercent);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          petData.date = new Date()
          petData.img = downloadURL
          petData.ownerId = storeUserdata.getUserIdbyEmail(storeAuth.getAuthEmail)
          petData.city = storeUserdata.getUserContent(storeAuth.getAuthEmail).city
          petData.state = storeUserdata.getUserContent(storeAuth.getAuthEmail).state
          storePets.addPet(petData)
          router.push('/')
        });
      }
    );
}

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
