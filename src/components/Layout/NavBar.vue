<template>
<nav class="navbar has-background-warning" role="navigation" aria-label="main navigation" >

    <div class="container is-max-desktop px-2">
        <div class="navbar-brand">
            <RouterLink class="navbar-item  is-size-4" to="/">
                <span class="itim-font">FindPet</span>
            </RouterLink>

            <a
              @click.prevent="showMobileNav = !showMobileNav"
              class="navbar-burger"
              :class="{ 'is-active' : showMobileNav }"
              aria-expanded="false"
              aria-label="menu"
              data-target="navbarBasicExample"
              role="button"
              ref="navbarBurgerRef"
            >           
            
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div
          id="navbarBasicExample"
          class="navbar-menu"
          :class="{ 'is-active' : showMobileNav }"
          ref="navbarMenuRef"
        >



            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                <a class="button is-light" 
                    v-if="storeAuth.user.id"
                    @click="goToProfile"
                >
                    <strong>Meu perfil</strong>
                </a>
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
}


</style>

<script setup>

import { ref } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
import { useStoreUserdata } from '@/stores/storeUserdata'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

/*
  store
*/
const storeUserdata = useStoreUserdata();
const storeAuth = useStoreAuth();

/*
  router
*/

const router = useRouter()


/*
  gotoprofile
*/
const goToProfile = () => {
    showMobileNav.value = false
    let userId = storeUserdata.getUserIdbyEmail(storeAuth.getAuthEmail);
    router.push(`/userPage/${userId}`)
  }

/*
  logout
*/

const logout = () => {
    showMobileNav.value = false
    storeAuth.logoutUser()
  }

/*
  mobile nav
*/

  const showMobileNav = ref(false)

/*
  click outside to close
*/

  const navbarMenuRef = ref(null)
  const navbarBurgerRef = ref(null)

  onClickOutside(navbarMenuRef, () => {
    showMobileNav.value = false
  }, {
    ignore: [navbarBurgerRef]
  })


</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}

a:hover {
  background-color:transparent;
  color: red
}

</style>