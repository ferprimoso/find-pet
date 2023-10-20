<template >
    <div class="modal is-active p-2" >
        <div class="modal-background"></div>
        <div 
        class="modal-card"
        ref="modalCardRef"
        >
            <header class="modal-card-head">
            <p class="modal-card-title">O que fazer?</p>
            <!-- <button class="delete" aria-label="close"></button> -->
            </header>
            <!-- <section class="modal-card-body">
                <span> <i class="fa-brands fa-whatsapp"></i>     {{ pet.id }}</span>
                <br>
                <span> <i class="fa-regular fa-envelope"></i> {{ pet.name }}  </span>
            </section> -->
            <footer class="modal-card-foot">
              <button class="button is-warning" @click="deleteAndCloseModal">Aprovar</button>
            <button class="button is-warning" @click="deleteAndCloseModal">Excluir</button>
            <button class="button is-warning" @click="closeModal">Cancelar</button>
            </footer>
        </div>
    </div>
</template>

<script setup>

/*
  imports
*/

  import { ref, onMounted, onUnmounted } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useStorePets }from '@/stores/storePets'
  import { useRoute, useRouter } from 'vue-router'


  const router = useRouter()


/* 
  pet store
*/

const storePets = useStorePets();



/*
  props
*/

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    pet: {
      type: Object,
      required: true
    }
  })

/*
  emits
*/

  const emit = defineEmits(['update:modelValue'])

/*
  store
*/



/*
  close modal
*/

  const closeModal = () => {
    emit('update:modelValue', false)
  }

/*
  delete and close modal
*/ 

 const deleteAndCloseModal = () => {
  closeModal()
  storePets.deletePet(props.pet.id)
  router.push('/')
 }


/*
  click outside to close
*/

  const modalCardRef = ref(null)

  onClickOutside(modalCardRef, closeModal)

/*
  keyboard control
*/

  const handleKeyboard = e => {
    if (e.key === 'Escape') closeModal()
  }

  onMounted(() => {
    document.addEventListener('keyup', handleKeyboard)
  })
  onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyboard)
  })

</script>