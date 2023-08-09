import { createRouter, createWebHashHistory } from 'vue-router';
import { useStoreAuth } from '@/stores/storeAuth'
import ViewAuth from '@/views/ViewAuth.vue';
import ViewPets from '@/views/ViewPets.vue';
import ViewPetPage from '@/views/ViewPetPage.vue';
import ViewAddPet from '@/views/ViewAddPet.vue';


const routes = [
  {
    path: '/',
    name: 'pets',
    component: ViewPets,
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
  if (!storeAuth.user.id && to.name !== 'auth') {
    return { name: 'auth' }
  }
  if (storeAuth.user.id && to.name === 'auth') {
    return false
  }
})


export default router;