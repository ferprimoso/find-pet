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
        [],
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
          let user = {
            id: doc.id,
            name: doc.data().name,
            state: doc.data().state,
            city: doc.data().city,
            email: doc.data().email,
            number: doc.data().number,
            img: doc.data().img,
            admin: doc.data().admin
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
    },
    getAdminbyEmail: (state) =>{
        return (email) => {
          if ( email ){
            try {
              return state.userdata.filter(user => user.email === email)[0].admin
            } catch {
              
            }
          } else {
            return false
          }
        }
    } 

  }
})





