<template>
  <div class="container">

    <h1>To-Do List</h1>
    <TodoSimpleForm @add-task="addTask" />
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
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
  components: {
    TodoSimpleForm
  },
  setup() {
    
    const todoList = ref([]);

    // TodoSimpleForm 컴포넌트에서 받아온 데이터 추가 시킨다
    const addTask = (todo) => {
      todoList.value.push(todo);
    };

    // 할 일 삭제
    const deleteTask = (index) => {
      todoList.value.splice(index, 1);
    };

    return {
      todoList,
      addTask,
      deleteTask
    }
  }
}
</script>

<style>
  .todoCompleted { color: gray; text-decoration: line-through; }
</style>