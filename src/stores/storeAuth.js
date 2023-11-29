import { useStoreUserdata } from '@/stores/storeUserdata'
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/js/firebase'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return { 
      user: {}
    }
  },
  actions: {
    init() {
      const storeUserdata = useStoreUserdata()


      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          storeUserdata.init()
          this.router.push('/')
        } else {
          this.user = {}
        }
      })
    },
    registerUser(credentials) {
       createUserWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
        
        const storeUserdata = useStoreUserdata()
        storeUserdata.addUserdata(
          {
            name: credentials.name,
            state: credentials.state,
            city: credentials.city,
            email: credentials.email,
            number: credentials.number,
            img: credentials.img,
            admin: false,
          }
        )

      }).catch((error) => {
        // console.log('error.message: ', error.message)
      })

    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password, credentials.admin ).then((userCredential) => {
        const user = userCredential.user
      }).catch((error) => {
        alert('Email ou senha invalido')
      })
    },
    logoutUser() {
      signOut(auth).then(() => {
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
