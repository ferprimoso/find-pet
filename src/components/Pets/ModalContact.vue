<template >
    <div class="modal is-active p-2" >
        <div class="modal-background"></div>
        <div 
        class="modal-card"
        ref="modalCardRef"
        >
            <header class="modal-card-head">
            <p class="modal-card-title">Contato para Adoção</p>
            <!-- <button class="delete" aria-label="close"></button> -->
            </header>
            <section class="modal-card-body">
                <span> <i class="fa-brands fa-whatsapp"></i>     {{ user.numero }}</span>
                <br>
                <span> <i class="fa-regular fa-envelope"></i> {{ user.email }}  </span>
            </section>
            <footer class="modal-card-foot">
            <button class="button is-warning" @click="closeModal">Fechar</button>
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

/*
  props
*/

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    user: {
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