<template>
  <div class="container">

    <h1>To-Do List</h1>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input class="form-control" type="text" v-model="todo" placeholder="Write new task">
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>  
        </div>
      </div>
      <div v-show="hasErr" style="color: red">This field cannot be empty</div>
    </form>

    <div v-for="(todo, index) in todoList" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input v-model="todo.completed" class="form-check-input" type="checkbox">
          <label :class="{ todoCompleted: todo.completed }" class="form-check-label">{{ todo.subject }}</label>
        </div>
        <div>
            <button class="btn btn-danger btn-sm" @click="deleteTask(index)">Delete</button>
          </div>
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
    const hasErr = ref(false); // 할 일 적지 않았을 경우 체크 플래그

    // 할 일 추가
    const onSubmit = () => {
      if(todo.value === '') {
        hasErr.value = true;
      }
      else {
        todoList.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false
        })
        hasErr.value = false;
        todo.value = '';
      }
      
    };

    // 할 일 삭제
    const deleteTask = (index) => {
      todoList.value.splice(index, 1);
    };

    return {
      todo,
      todoList,
      hasErr,
      onSubmit,
      deleteTask
    }
  }
}
</script>

<style>
  .todoCompleted { color: gray; text-decoration: line-through; }
</style>