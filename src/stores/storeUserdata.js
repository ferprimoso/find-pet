import { defineStore } from 'pinia'
import { 
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc, getDoc, getDocs,
  query, orderBy, where 
} from 'firebase/firestore'
import { db } from '@/js/firebase'

let userdataCollectionRef = collection(db, 'users')
let currentUserQuery 
 
let getuserdataSnapshot = null

export const useStoreUserdata = defineStore('storeUserdata',{
  state: () => {
    return {
      userdata:
        [
          // id: 'id3',
          // name: 'Luiz Fernando',
          // city: 'Campinas',
          // email: 'test@test.com',
          // numero: '13 999999999',
          // img: 'src/assets/IMG-20200327-WA0014.jpeg'
        ],
    }
  },
  actions: {
    init() {
      currentUserQuery = query(userdataCollectionRef)

      this.getUsers()
    },
    async getUsers() {

      const querySnapshot = await getDocs(userdataCollectionRef);
      let userdata = []
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
          let user = {
            id: doc.id,
            name: doc.data().name,
            state: doc.data().state,
            city: doc.data().city,
            email: doc.data().email,
            numero: doc.data().numero,
            img: doc.data().img,
          }

          userdata.push(user)
      })
      this.userdata = userdata
    },
    async addUserdata(newUserdataContent) {
        await addDoc(userdataCollectionRef, newUserdataContent
        );
    },
    },
  getters: {
    getUserContent: (state) => {
      return (email) => {
        console.log(email)
        return state.userdata.filter(user => user.email === email)[0]
      }
    },
    getUserContentbyId: (state) => {
      return (id) => {
        return state.userdata.filter(user => user.id === id)[0]
      }
    },
    getUserIdbyEmail: (state) =>{ 
      return (email) => {
        return state.userdata.filter(user => user.email === email)[0].id
      }
    }
  }
})





