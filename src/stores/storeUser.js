import { defineStore } from 'pinia'
import { 
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc, 
  query, orderBy 
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'


export const useStoreUser = defineStore('storeUser',{
  state: () => {
    return {
      user: [
        // {
        //   id: 'id1',
        //   name: 'Finn',
        //   isCat: true,
        //   cidade: 'Guarujá',
        //   img: 'src/assets/IMG-20200327-WA0014.jpeg'
        // },
    
      ]
    }
  },
  actions: {
    
  },
  getters: {
  
  }
})





