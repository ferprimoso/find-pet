import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

// vue paginate
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";


//pinia 
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})


createApp(App)
  .use(pinia)
  .use(router)
  .use(VueAwesomePaginate)
  .mount('#app')

