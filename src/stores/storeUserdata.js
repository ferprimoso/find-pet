import { defineStore } from 'pinia'
import { 
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc, getDocs,
  query, orderBy, where 
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

let userdataCollectionRef = collection(db, 'users')
let currentUserQuery 
 
let getuserdataSnapshot = null

export const useStoreUserdata = defineStore('storeUserdata',{
  state: () => {
    return {
      userdata:
        {
          // id: 'id3',
          // name: 'Luiz Fernando',
          // city: 'Campinas',
          // email: 'test@test.com',
          // numero: '13 999999999',
          // img: 'src/assets/IMG-20200327-WA0014.jpeg'
        }
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()
      currentUserQuery = query(userdataCollectionRef, where("authid","==",storeAuth.user.id))

      this.getCurrentUser()
    },
    async getCurrentUser() {
      if (getuserdataSnapshot) getuserdataSnapshot() // unsubscribe from any active listener

      const querySnapshot = await getDocs(currentUserQuery);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
          let user = {
            id: doc.data().id,
            name: doc.data().name,
            city: doc.data().city,
            email: doc.data().email,
            numero: doc.data().numero,
            img: doc.data().img,
          }
          this.userdata = user

      });

      // getuserdataSnapshot = onSnapshot(currentUserQuery, (querySnapshot) => {
      //   querySnapshot((doc) => {
      //     let user = {
      //       id: doc.data().id,
      //       name: doc.data().name,
      //       city: doc.data().city,
      //       email: doc.data().email,
      //       numero: doc.data().numero,
      //       img: doc.data().img,
      //     }
      //     this.userdata = user
      //   })
      //   // this.petsLoaded = true
      // }, error => {
      //   console.log('error.message: ', error.message)
      // })
    },
    async addUserdata(newUserdataContent) {
        console.log(newUserdataContent);
        await addDoc(userdataCollectionRef, newUserdataContent
        );
    },
    async removeCurrentUserdata() {
      
    }
  },
  getters: {
    getUserdataContent: (state) => {
      return state.userdata
      
    }
  }
})





