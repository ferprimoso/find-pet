import { createRouter, createWebHashHistory } from 'vue-router';
import { useStoreAuth } from '@/stores/storeAuth'
import ViewAuth from '@/views/ViewAuth.vue';
import ViewPets from '@/views/ViewPets.vue';
import ViewUserPage from '@/views/ViewUserPage.vue';
import ViewPetPage from '@/views/ViewPetPage.vue';
import ViewAddPet from '@/views/ViewAddPet.vue';
import ViewAdmin from '@/views/ViewAdmin.vue';
import { useStoreUserdata } from '../stores/storeUserdata';


const routes = [
  {
    path: '/',
    name: 'pets',
    component: ViewPets,
  },
  {
    path: '/userPage/:id',
    name: 'userPage',
    component: ViewUserPage
  },
  {
    path: '/petPage/:id',
    name: 'petPage',
    component: ViewPetPage
  },
  {
    path: '/addPet',
    name: 'addPet',
    component: ViewAddPet
  },
  {
    path: '/admin',
    name: 'admin',
    component: ViewAdmin
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



// navigation guards
router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth()
  const storeUserdata = useStoreUserdata()
  if (storeAuth.user.id && to.name === 'auth') {
    return false
  }
  if (!storeUserdata.getAdminbyEmail(storeAuth.user.email) && to.name === 'admin') {
    return false
  }
})

export default router;