import { defineStore } from 'pinia'
import { 
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc, 
  query, orderBy 
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'


export const useStoreUserdata = defineStore('storeUser',{
  state: () => {
    return {
      userdata:[
        {
          id: 'id3',
          name: 'Luiz Fernando',
          city: 'Campinas',
          email: 'test@test.com',
          numero: '13 999999999',
          img: 'src/assets/IMG-20200327-WA0014.jpeg'
        }
      ] 
    }
  },
  actions: {
    
  },
  getters: {
    getUserdataContent: (state) => {
      return (id) => {
        return state.userdata.filter(userdata => userdata.id === id )[0]
      }
    }
  }
})





