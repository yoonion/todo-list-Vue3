<template>
  <!-- nav bar -->
  <Navbar />

  <!-- component 불러오는 곳 -->
  <div class="container">
    <router-view/>
  </div>
  <Toast />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Toast from './components/Toast.vue';

export default {
  components: {
    Toast,
    Navbar
  }
}
</script>

<style>
</style>