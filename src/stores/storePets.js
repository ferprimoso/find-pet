import { defineStore } from 'pinia'
import { 
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc, getDocs, getDoc,
  query, orderBy, where
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'


let petCollectionRef = collection(db, 'pets')
let petCollectionQuery 
let getPetsSnapshot = null


export const useStorePets = defineStore('storePets',{
  state: () => {
    return {
      pets: [],
      petsLoaded: false,
    }
  },
  actions: {
    init() {
      petCollectionQuery = query(petCollectionRef)

      this.getPets()
    },
    async getPets() {
      this.petsLoaded = false

      if (getPetsSnapshot) getPetsSnapshot() // unsubscribe from any active listener

      let q = petCollectionQuery
      q = query(q, where("aproved", "==", true));

      

      getPetsSnapshot = onSnapshot(q, (querySnapshot) => {
        let pets = []
        querySnapshot.forEach((doc) => {
          let pet = doc.data();
          pet.id = doc.id
          pets.push(pet)
        })
        this.pets = pets
        this.petsLoaded = true
      }, error => {
        console.log('error.message: ', error.message)
      })
    },
    async getUnapproved() {
      let q = petCollectionRef
      q = query(q, where("aproved", "==", false));


      const querySnapshot = await getDocs(q);
      this.pets = []
      querySnapshot.forEach((doc) => {
        let pet = doc.data()
        pet.id = doc.id
        this.pets.push(pet)
      });
      this.petsLoaded = true

    },
    async addPet(newPetContent) {
      await addDoc(petCollectionRef, newPetContent)
    },
    async performSearch(filterObj) {
    
    this.petsLoaded = false

    let q = petCollectionRef


    if (filterObj.especie) {
      q = query(q, where("especie", "==", filterObj.especie));
    }

    if (filterObj.sexo) {
      q = query(q, where("sexo", "==", filterObj.sexo));
    }

    if (filterObj.porte) {
      q = query(q, where("porte", "==", filterObj.porte));
    }

    if (filterObj.state) {
      q = query(q, where("state", "==", filterObj.state.nome));
    }

    if (filterObj.cidade) {
      q = query(q, where("cidade", "==", filterObj.cidade));
    }

    if (filterObj.name) {
      q = query(q, where("name", "==", filterObj.name));
    }

    const querySnapshot = await getDocs(q);
    this.pets = []
    querySnapshot.forEach((doc) => {
      let pet = doc.data()
      pet.id = doc.id
      this.pets.push(pet)
    });
    this.petsLoaded = true

    },
    async deletePet(petId) {
      await deleteDoc(doc(petCollectionRef, petId))
    },
    async adoptPet(petId) {
      const petRef = doc(petCollectionRef, petId)
      const petSnapshot = await getDoc(petRef);
      const currentAdoptionStatus = petSnapshot.data().adopted;

      // Toggle the 'adopted' field
      const newAdoptionStatus = !currentAdoptionStatus;

      // Update the Firestore document
      await updateDoc(petRef, {
        adopted: newAdoptionStatus
      });
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
    },
  }
})





