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

      let q = petCollectionRef
      q = query(q, where("aproved", "==", true));


      const querySnapshot = await getDocs(q);
      this.pets = []
      querySnapshot.forEach((doc) => {
        let pet = doc.data()
        pet.id = doc.id
        this.pets.push(pet)
      });
      this.petsLoaded = true
      
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
    q = query(q, where("aproved", "==", true));


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

    if (filterObj.city) {
      q = query(q, where("city", "==", filterObj.city));
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
    async approvePet(petId) {
      const petRef = doc(petCollectionRef, petId)

      await updateDoc(petRef, {
        aproved: true
      });

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





