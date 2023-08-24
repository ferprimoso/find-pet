<template>
<nav class="navbar has-background-warning" role="navigation" aria-label="main navigation" >

    <div class="container">
        <div class="navbar-brand">
            <RouterLink class="navbar-item itim-font is-size-4" to="/">
                FindPet
            </RouterLink>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                <RouterLink class="button is-light" to="/userPage">
                    <strong>Meu perfil</strong>
                </RouterLink>
                <a class="button is-light"
                    v-if="storeAuth.user.id"
                    @click="logout"
                >
                    Sair
                </a>
                </div>
            </div>
            </div>
        </div>
    </div>
</nav>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&family=Roboto&display=swap');

.orange {
    background-color: #EE964B;
}

.itim-font {
    font-family: 'Itim', cursive;
    font-family: 'Roboto', sans-serif;
}


</style>

<script setup>

  import { useStoreAuth } from '@/stores/storeAuth'

/*
  store
*/

  const storeAuth = useStoreAuth()


/*
  logout
*/

const logout = () => {
    storeAuth.logoutUser()
  }

</script>