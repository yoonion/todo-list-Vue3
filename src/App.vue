<template>
  <div class="container">
    <h1>To-Do List</h1>
      <form class="d-flex" @submit.prevent="onSubmit">
        <div class="flex-grow-1 mr-2">
          <input class="form-control" type="text" v-model="todo" placeholder="Write new task">
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>  
        </div>
      </form>

      <div v-for="todo in todoList" :key="todo.id" class="card mt-2">
        <div class="card-body p-2">
          {{ todo.subject }}
        </div>
      </div>

  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const todo = ref('');
    const todoList = ref([]);

    const onSubmit = () => {
      // console.log('onSubmit !!');

      // add task 
      todoList.value.push({
        id: Date.now(),
        subject: todo.value
      })
    };

    return {
      todo,
      todoList,
      onSubmit
    }
  }
}
</script>

<style>

</style>