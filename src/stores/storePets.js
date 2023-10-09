import { defineStore } from 'pinia'
import { 
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc, 
  query, orderBy 
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'


let petCollectionRef = collection(db, 'pets')
let petCollectionQuery 
 
let getPetsSnapshot = null



export const useStorePets = defineStore('storePets',{
  state: () => {
    return {
      pets: [
        //   id: 'id5',
        //   name: 'Sam',
        //   isCat: true,
        //   cidade: 'Campinas',
        //   img: 'src/assets/20200407_130345.jpg'
        // }
      ]
    }
  },
  actions: {
    init() {
      petCollectionQuery = query(petCollectionRef)

      this.getPets()
    },
    async getPets(specieFilter = false, sexFilter = false, sizeFilter = false) {
      if (getPetsSnapshot) getPetsSnapshot() // unsubscribe from any active listener



      getPetsSnapshot = onSnapshot(petCollectionQuery, (querySnapshot) => {
        let pets = []
        querySnapshot.forEach((doc) => {
          let pet = {
            ownerId: doc.data().ownerId,
            id: doc.id,
            date: doc.data().date,
            name: doc.data().name,
            sexo: doc.data().sexo,
            especie: doc.data().especie,
            porte: doc.data().porte,
            state: doc.data().state,
            cidade: doc.data().cidade,
            img: doc.data().img,
            descricao: doc.data().descricao,
            adopted: doc.data().adopted
          }

          pets.push(pet)
        })
        this.pets = pets
        // this.petsLoaded = true
      }, error => {
        console.log('error.message: ', error.message)
      })
    },
    async addPet(newPetContent) {
      await addDoc(petCollectionRef, newPetContent)
    } 
  },
  getters: {
    getPetContent: (state) => {
      return (id) => {
        return state.pets.filter(pet => pet.id === id)[0]
      }
    },
    getUserPets: (state) => {
      return (ownerId) => {
        return state.pets.filter(pet => pet.ownerId === ownerId)
      }
    }
  }
})





