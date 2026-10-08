<template>
  <v-snackbar
    v-model="toast.state.visible"
    class="app-toast"
    location="bottom"
    :timeout="2300"
    role="status"
  >
    {{ toast.state.message }}
  </v-snackbar>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const toast = useToast()
</script>
