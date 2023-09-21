import { useStorePets }from '@/stores/storePets'
import { useStoreUserdata } from '@/stores/storeUserdata'
import { defineStore } from 'pinia'
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { db } from '@/js/firebase'
import { auth } from '@/js/firebase'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return { 
      user: {}
    }
  },
  actions: {
    init() {
      const storePets = useStorePets()
      const storeUserdata = useStoreUserdata()


      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
          storePets.init()
          storeUserdata.init()
        } else {
          this.user = {}
          this.router.replace('/auth')
          // storeNotes.clearNotes()
        }
      })
    },
    registerUser(credentials) {
       createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
        // console.log('user: ', user)

        console.log(credentials)
        
        const storeUserdata = useStoreUserdata()
        storeUserdata.addUserdata(
          {
            name: credentials.name,
            city: credentials.city,
            email: credentials.email,
            numero: credentials.numero,
            img: credentials.img,
          }
        )
      }).catch((error) => {
        // console.log('error.message: ', error.message)
      })

    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
        // console.log('user: ', user)
      }).catch((error) => {
        // console.log('error.message: ', error.message)
      })
    },
    logoutUser() {
      signOut(auth).then(() => {
        
        // console.log('User signed out')
      }).catch((error) => {
        // console.log(error.message)
      })
    }
  },
  getters: {
    getAuthEmail: (state) => {
      return state.user.email
    }
  }
})
