<template>
  <!-- nav bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">Home</router-link>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'TodoList' }">Todo list</router-link>
      </li>
    </ul>
  </nav>

  <!-- component 불러오는 곳 -->
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>

</style>