<template>
<div class="auth">
    <div class="tabs is-centered">
    <ul>
        <li
        :class="{ 'is-active' : !register }"
        >
        <a @click.prevent="register = false">Login</a>
        </li>
        <li
        :class="{ 'is-active' : register }"
        >
        <a @click.prevent="register = true">Register</a>
        </li>
    </ul>
    </div>

    <div class="card auth-form">
    <div class="card-content">
        <div class="title has-text-centered">
        {{ formTitle }}
        </div>

        <form
        @submit.prevent="onSubmit"
        >
        <div class="field">
            <label class="label">Email</label>
            <div class="control">
            <input
                v-model="credentials.email"
                class="input"
                placeholder="e.g. alexsmith@gmail.com"
                type="email"
            >
            </div>
        </div>

        <div class="field" :class="{ 'is-hidden' : !register }"
>
            <label class="label">Name</label>
            <div class="control">
            <input
                v-model="credentials.name"
                class="input"
                placeholder="e.g Alex smith"
            >
            </div>
        </div>


        <div class="field" :class="{ 'is-hidden' : !register }"
>
            <label class="label">Cidade</label>
            <div class="control">
            <input
                v-model="credentials.city"
                class="input"
                placeholder="e.g Alex smith"
            >
            </div>
        </div>

        <div class="field" :class="{ 'is-hidden' : !register }"
>
            <label class="label">Numero</label>
            <div class="control">
            <input
                v-model="credentials.numero"
                class="input"
                placeholder="e.g Alex smith"
            >
            </div>
        </div>

        <div class="field">
            <label class="label">Password</label>
            <div class="control">
            <input
                v-model="credentials.password"
                class="input"
                placeholder="Enter a password"
                type="password"
            >
            </div>
        </div>

        <div class="field is-grouped" :class="{ 'is-hidden' : !register }">
        <div v-if="previewUrl">
            <img :src="previewUrl" alt="Preview" style="max-width: 300px; max-height: 300px;">
        </div>

        <input type="file" @change="handleFileChange" accept="image/*">
        </div>

        <div class="field is-grouped is-grouped-right">
            <p class="control">
            <button class="button is-primary is-warning">
                {{ formTitle }}
            </button>
            </p>
        </div>
        </form>

    </div>
    </div>
</div>
</template>

<script setup>

import { ref, computed, reactive } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

/*
store
*/

const storeAuth = useStoreAuth()

/*
register / login
*/

const register = ref(false)

/*
form title
*/

const formTitle = computed(() => {
    return register.value ? 'Register' : 'Login'
})


/* storage image */

const storage = getStorage();
let storageReference = null;
let file = null;

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




/*
credentials
*/

const credentials = reactive({
    email: '',
    name: '',
    password: '',
    city: '',
    numero: '',
    img: '',
})

/*
submit
*/

const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
    alert('Please enter an email and password!')
    }
    else {
    if (register.value) {
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
            credentials.img = url
            storeAuth.registerUser(credentials)
            })
            .catch((error) => {
            // Handle any errors
            }),
        )
    }
    else {
        storeAuth.loginUser(credentials)
    }
    }
}
</script>

<style>
.auth-form {
max-width: 400px;
margin: 0 auto;
}
</style>