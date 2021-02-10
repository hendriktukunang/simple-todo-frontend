<template>
  <span></span>
</template>

<script>
import { store } from '../store'
export default {

  created() {
    store.state.credentials = null
    this.$router.push({ name: 'login' })
  }
}
</script>

