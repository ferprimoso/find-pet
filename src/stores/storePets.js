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
        // {
        //   id: 'id1',
        //   name: 'Finn',
        //   isCat: true,
        //   cidade: 'Guarujá',
        //   img: 'src/assets/IMG-20200327-WA0014.jpeg'
        // },
        // {
        //   id: 'id2',
        //   name: 'Sam',
        //   isCat: true,
        //   cidade: 'Campinas',
        //   img: 'src/assets/20200407_130345.jpg'
        // },
        // {
        //   id: 'id3',
        //   name: 'Sam',
        //   isCat: true,
        //   cidade: 'Campinas',
        //   img: 'src/assets/20200407_130345.jpg'
        // },
        // {
        //   id: 'id4',
        //   name: 'Sam',
        //   isCat: true,
        //   cidade: 'Campinas',
        //   img: 'src/assets/20200407_130345.jpg'
        // },
        // {
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
    async getPets() {
      if (getPetsSnapshot) getPetsSnapshot() // unsubscribe from any active listener

      getPetsSnapshot = onSnapshot(petCollectionQuery, (querySnapshot) => {
        let pets = []
        querySnapshot.forEach((doc) => {
          let pet = {
            id: doc.id,
            name: doc.data().content.name,
            sexo: doc.data().content.sexo,
            especie: doc.data().content.especie,
            porte: doc.data().content.porte,
            cidade: doc.data().content.cidade,
            img: doc.data().content.img,
            descricao: doc.data().content.descricao,
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
      await addDoc(petCollectionRef, {
        content: newPetContent
      })
    } 
  },
  getters: {
    getPetContent: (state) => {
      return (id) => {
        return state.pets.filter(pet => pet.id === id)[0]
      }
    }
  }
})





